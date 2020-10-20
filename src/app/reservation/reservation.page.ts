import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { AlerterrorService } from '../alerterror.service';
import { ToasterService } from '../toaster.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as firebase from 'firebase';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  pet: any;

  userId: string = '';
  previousreservationDetails: any;
  upcomingreservationDetails: any;
  coverImage: any;
  distanceCalArray: Array<any>=[];
  distanceArr: Array<any>=[];

  distanceObj = {
    restaurantId: '',
    distance: ''
 };
 // prev
 distanceCalArrayPrev: Array<any>=[];
  distanceArrPrev: Array<any>=[];

  distanceObjPrev = {
    restaurantId: '',
    distance: ''
 };
 singleCategoryDataUp: any;
 singleCategoryDataPrev: any;
 loaderShow: boolean = false;

 userAuth: boolean = false;

 discount: any;

  constructor(public loader: LoaderService,
    public alertService: AlerterrorService,
    public toastService: ToasterService,
    public router: Router,
    public geolocation: Geolocation,
    public barcodeCtrl: BarcodeScanner,
    public barcodeScanner: BarcodeScanner,
    public restService: RestService) { }

  ngOnInit() {
    if(firebase.auth().currentUser){
      this.userAuth = true;

      this.pet = 'upcoming';
    this.distanceCalArray = [];
    this.distanceArr = [];
   
    this.userId = firebase.auth().currentUser.uid;
    var stringy=JSON.stringify({
      userId: this.userId,
      requestType: 'upcomming'
    });
    //this.loader.presentLoader();
    this.loaderShow = true;
    this.restService.upcomingReservations(stringy).subscribe(response => {
      console.log(JSON.parse(response['_body']));
      this.upcomingreservationDetails = JSON.parse(response['_body']).restaurant_data;
     // this.previousreservationDetails = JSON.parse(response['_body']).previous;
      this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
      this.discount = JSON.parse(response['_body']).discounts;
      this.singleCategoryDataUp = this.upcomingreservationDetails;
        //getting the distance in km's
        this.loaderShow = false;
        if(this.singleCategoryDataUp){
        for(let i = 0; i < this.singleCategoryDataUp.length; i++){
          this.distanceCalArray.push(this.singleCategoryDataUp[i]);
        }
        
        this.geolocation.getCurrentPosition().then((res) => {
          // resp.coords.latitude
          // resp.coords.longitude
          //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
          let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
          var lat1 = res.coords.latitude;
          var lng1 = res.coords.longitude;
          console.log(this.distanceCalArray);
          for(let i = 0; i < this.distanceCalArray.length; i++){
            var lat2 = this.distanceCalArray[i].latitude;
            var lng2 = this.distanceCalArray[i].longitude;
            var restaurantId = this.distanceCalArray[i].restaurants_id;
            var d= this.getDistanceFromLatLonInKm((lat1),lng1,parseFloat(lat2),parseFloat(lng2) , restaurantId);
            console.log(d);
            this.distanceObj = {
              restaurantId: '',
              distance: ''
            }
          this.distanceObj.restaurantId = restaurantId;
          this.distanceObj.distance = d.toString();
          this.distanceArr.push(this.distanceObj);
           
          }
          console.log(this.distanceArr);
          const filteredArr = this.distanceArr.reduce((acc, current) => {
            const x = acc.find(item => item.restaurantId === current.restaurantId);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          console.log(filteredArr);
          this.distanceArr = filteredArr;
        }).catch((error) => {
          this.loaderShow = false;
          console.log('Error getting location', error);
        });

      
      }
     // this.loader.hideLoader();
    },err => {
      this.loaderShow = false;
     // this.loader.hideLoader();
      this.alertService.presentAlertService(err);
    });
    
    }else {
      this.userAuth = false;
    }
    
  }
  getupcomingReservations(){
    this.distanceCalArray = [];
    this.distanceArr = [];
   
    this.userId = firebase.auth().currentUser.uid;
    var stringy=JSON.stringify({
      userId: this.userId,
      requestType: 'upcomming'
    });
    //this.loader.presentLoader();
    this.loaderShow = true;
    this.restService.upcomingReservations(stringy).subscribe(response => {
      console.log(JSON.parse(response['_body']));
      this.upcomingreservationDetails = JSON.parse(response['_body']).restaurant_data;
     // this.previousreservationDetails = JSON.parse(response['_body']).previous;
      this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
      this.discount = JSON.parse(response['_body']).discounts;
      this.singleCategoryDataUp = this.upcomingreservationDetails;
        //getting the distance in km's
        this.loaderShow = false;
        if(this.singleCategoryDataUp){
        for(let i = 0; i < this.singleCategoryDataUp.length; i++){
          this.distanceCalArray.push(this.singleCategoryDataUp[i]);
        }
        
        this.geolocation.getCurrentPosition().then((res) => {
          // resp.coords.latitude
          // resp.coords.longitude
          //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
          let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
          var lat1 = res.coords.latitude;
          var lng1 = res.coords.longitude;
          console.log(this.distanceCalArray);
          for(let i = 0; i < this.distanceCalArray.length; i++){
            var lat2 = this.distanceCalArray[i].latitude;
            var lng2 = this.distanceCalArray[i].longitude;
            var restaurantId = this.distanceCalArray[i].restaurants_id;
            var d= this.getDistanceFromLatLonInKm((lat1),lng1,parseFloat(lat2),parseFloat(lng2) , restaurantId);
            console.log(d);
            this.distanceObj = {
              restaurantId: '',
              distance: ''
            }
          this.distanceObj.restaurantId = restaurantId;
          this.distanceObj.distance = d.toString();
          this.distanceArr.push(this.distanceObj);
           
          }
          console.log(this.distanceArr);
          const filteredArr = this.distanceArr.reduce((acc, current) => {
            const x = acc.find(item => item.restaurantId === current.restaurantId);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          console.log(filteredArr);
          this.distanceArr = filteredArr;
        }).catch((error) => {
          this.loaderShow = false;
          console.log('Error getting location', error);
        });

        }

     // this.loader.hideLoader();
    },err => {
      this.loaderShow = false;
     // this.loader.hideLoader();
      this.alertService.presentAlertService(err);
    });
  }
  getupreviousReservations(){
    this.pet = 'previous';
    this.distanceCalArray = [];
    this.distanceArr = [];
    this.userId = firebase.auth().currentUser.uid;
    var stringy=JSON.stringify({
      userId: this.userId,
      requestType: 'previous'
    });
    //this.loader.presentLoader();
    this.restService.previousReservations(stringy).subscribe(response => {
      console.log(JSON.parse(response['_body']));
      this.previousreservationDetails = JSON.parse(response['_body']).restaurant_data;
      this.previousreservationDetails = this.previousreservationDetails.reverse();
      this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
      this.discount = JSON.parse(response['_body']).discounts;
     // this.loader.hideLoader();
       // for prev get the distance value
       this.singleCategoryDataPrev = this.previousreservationDetails;
       //getting the distance in km's
       this.loaderShow = false;
       if(this.singleCategoryDataPrev){
       for(let i = 0; i < this.singleCategoryDataPrev.length; i++){
         this.distanceCalArrayPrev.push(this.singleCategoryDataPrev[i]);
       }
       
       this.geolocation.getCurrentPosition().then((res) => {
         // resp.coords.latitude
         // resp.coords.longitude
         //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
         let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
         var lat1 = res.coords.latitude;
         var lng1 = res.coords.longitude;
         console.log(this.distanceCalArrayPrev);
         for(let i = 0; i < this.distanceCalArrayPrev.length; i++){
           var lat2 = this.distanceCalArrayPrev[i].latitude;
           var lng2 = this.distanceCalArrayPrev[i].longitude;
           var restaurantId = this.distanceCalArrayPrev[i].restaurants_id;
           var d= this.getDistanceFromLatLonInKmPrev((lat1),lng1,parseFloat(lat2),parseFloat(lng2) , restaurantId);
           console.log(d);
           this.distanceObjPrev = {
             restaurantId: '',
             distance: ''
           }
         this.distanceObjPrev.restaurantId = restaurantId;
         this.distanceObjPrev.distance = d.toString();
         this.distanceArrPrev.push(this.distanceObjPrev);
          
         }
         console.log(this.distanceArrPrev);
         const filteredArr = this.distanceArrPrev.reduce((acc, current) => {
          const x = acc.find(item => item.restaurantId === current.restaurantId);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        console.log(filteredArr);
        this.distanceArrPrev = filteredArr; 
       }).catch((error) => {
         this.loaderShow = false;
         console.log('Error getting location', error);
       });
      }
    },err => {
      //this.loader.hideLoader();
      this.alertService.presentAlertService(err);
    });
  }
  goToHome(){
    this.router.navigateByUrl('/tabs/home');
  }

   // calculate distance
   getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2 , restaurantId) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        
        return d;
    }

     // calculate distance prev
   getDistanceFromLatLonInKmPrev(lat1,lon1,lat2,lon2 , restaurantId) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        
        return d;
    }
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  previousArray: Array<any> = [];

  scannedData: any;
  scanQr(val){
    console.log(val);
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'QR_CODE,PDF_417 ',
      orientation: 'landscape',
    };

    this.barcodeCtrl.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;
    }).catch(err => {
      console.log('Error', err);
    });
  }
  cityName: string = '';
  ionViewWillEnter(){
    this.userId = localStorage.getItem('userId');
    var stringy = JSON.stringify({
      userId: this.userId
    });
    this.restService.getUserCity(stringy).subscribe(data => {
      console.log(data);
      this.cityName = JSON.parse(data['_body']).city_name;
    } , err => {
      console.log(err);
    });
  }
  chooseCity(){
    this.router.navigate(['/countries']);
  }
}
