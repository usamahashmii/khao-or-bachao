import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseauthService } from '../firebaseauth.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RestService } from '../rest.service';
import { AlerterrorService } from '../alerterror.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToasterService } from '../toaster.service';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-reservationdetails',
  templateUrl: './reservationdetails.page.html',
  styleUrls: ['./reservationdetails.page.scss'],
})
export class ReservationdetailsPage implements OnInit {
  userId: string = '';
  name: string = '';
  email: string = '';
  number: string = '';

  restaurantId: any;
  loaderShow: boolean = false;
  restaurantDetail: any;
  discounts: any;
  restaurantImageUrl: any;
  deals: any;
  map:any;

  showMap: boolean = false;

  distanceCalArray: Array<any>=[];
  distanceArr: Array<any>=[];

  distanceObj = {
    restaurantId: '',
    distance: ''
 };
 discount: any;
 personsCount: any;
 reservationDate: any;

 scannedData: any;
 encodedData = '';
 
 end_date: any;
 type: any;

  constructor(public firebase: FirebaseauthService,
    public router: Router,
    public route: ActivatedRoute,
    public barcodeCtrl: BarcodeScanner,
    public geolocation: Geolocation,
    public restService: RestService,
    public toastService: ToasterService,
    public alertService: AlerterrorService,
    public barcodeScanner: BarcodeScanner,
    ) { }

  ngOnInit() {
    console.log('ionViewDidLoad ProfilePage');
    //check if user is already logged in
    this.loaderShow = true;
    this.userId = firebase.auth().currentUser.uid;
    console.log(firebase.auth().currentUser);
    if(firebase.auth().currentUser){
      if (firebase.auth().currentUser.providerData[0].providerId == 'password') {
        console.log('login with normal');
        //this.showPasswordInput = true;
      }else if(firebase.auth().currentUser.providerData[0].providerId == 'facebook.com'){
        console.log('login with Facebook');
        //this.showPasswordInput = false;
      }
    }
    //this.loader.presentLoader();
   // this.loaderShow = true;
    this.firebase.getProfileData(this.userId).once("value" , snapshot => {
      //this.loader.hideLoader();
      //this.loaderShow = false;
      if(snapshot.val()){
        this.name = snapshot.val().name;
        this.email = snapshot.val().email;
        //making a check to avoid undefined value
        if(snapshot.val().number){
          this.number = snapshot.val().number;
        }else {
          this.number = '';
        }
        this.loaderShow = false;
      }else {
        this.loaderShow = false;
        console.log('No data');
      }
    }).catch(err => {
      //this.loaderShow = false;
        //this.alertError.presentAlertAuth(err);
    });
  }
  ionViewWillEnter(){
    this.showMap = false;
    this.route.queryParams.subscribe(data =>{
      console.log(data);
      this.restaurantId = data.id;
      this.discountId = data.discountId;
      this.discount_rate = data.discount_rate,
      this.start_time = data.start_time,
      this.end_time = data.end_time,
      this.personsCount = data.persons,
      this.end_date = data.end_date,
      this.type = data.type,
      this.reservationDate = data.reservationDate
      console.log(JSON.stringify(this.discount));
      var stringy = JSON.stringify({
        requestType: 'all_by_id',
        restaurantId: this.restaurantId 
      });
      this.loaderShow = true;
      this.restService.getSingleRestaurantDetails(stringy).subscribe(data => {
        this.loaderShow = false;
        console.log(JSON.parse(data['_body']));
        this.restaurantDetail = JSON.parse(data['_body']).restaurant_data;
        this.deals = JSON.parse(data['_body']).deals;
        this.discounts = JSON.parse(data['_body']).discounts;
        this.restaurantImageUrl = JSON.parse(data['_body']).restaurants_img_url;
       // this.openingHours = JSON.parse(data['_body']).operating_hours;
        for(let i = 0; i < this.restaurantDetail.length; i++){
          if(this.restaurantId == this.restaurantDetail[i].restaurants_id){
            console.log(this.restaurantDetail[i]);
            //this.displayGoogleMap(this.restaurantDetail[i]);
          }else {
            console.log('No match');
          }
        }
        //getting the distance in km's
        for(let i = 0; i < this.restaurantDetail.length; i++){
          this.distanceCalArray.push(this.restaurantDetail[i]);
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
        }).catch((error) => {
          console.log('Error getting location', error);
        });
        
      },err => {
        this.loaderShow = false;
        this.alertService.presentAlertService(err);
      });
    });
  }
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
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  //confirming reservation
  confirmReservation(){
      console.log(new Date());
      var stringy = JSON.stringify({
        requestType: 'add_new',
        restaurantId: this.restaurantId,
        userID: this.userId,
        number_of_users: this.personsCount,
        reservation_date: this.reservationDate,
        discount_id: this.discountId,
      });
      this.loaderShow = true;
      this.restService.confirmReservationForUser(stringy).subscribe(response => {
        this.loaderShow = false;
        console.log(JSON.parse(response['_body']));
        if(JSON.parse(response['_body']).status == 'error'){
          this.toastService.presentToastMessage('Some problem occurred in reserving restaurant!');
        }else{
          this.toastService.presentToastMessageConfirm('Congratulations! Your reservation is confirmed!Please scan the Qr code when you reach the restaurant');
          let navigationExtras: NavigationExtras = {
            queryParams:{
              id: this.restaurantId,
              discountId: this.discountId,
              discount_rate: this.discount_rate,
              start_time: this.start_time,
              end_time: this.end_time,
              persons: this.personsCount,
              reservationDate: this.reservationDate,
              end_date: this.end_date,
              type: this.type,
            }
          }
          this.router.navigate(['/qrconfirm'] , navigationExtras);
        }
      } , err => {
        this.alertService.presentAlertService('Network error ocurred in reservation!');
      });
    
  }

  //discounts vars
  discountId: any;
  end_time: any;
  start_time: any;
  discount_rate: any;

  goToBarcodeScan() {
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
  qrData = 'https:ionicacademy.com';
  scannedCode = null;
  elemenyType : 'url' | 'canvas' | 'img' = 'canvas';
 
  scanCode(){
    this.barcodeScanner.scan().then(
      barcodeData =>{
        this.scannedCode = barcodeData.text;	
        this.toastService.presentToastMessage('Successfully scanned the code!');
      }
    );
  }
  downloadQR(){
    
  }
  goToReservationDetail(){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        id: this.restaurantId
      }
    }
    this.router.navigate(['/singlerestaurant'] , navigationExtras)
  }
}
