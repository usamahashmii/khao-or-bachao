import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { RestService } from '../rest.service';
import { AlerterrorService } from '../alerterror.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as firebase from 'firebase';
import { ToasterService } from '../toaster.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.page.html',
  styleUrls: ['./single-category.page.scss'],
})
export class SingleCategoryPage implements OnInit {

  categoryId: any;
  //loader 
  loaderShow: boolean = false;
  singleCategoryData: any;

  itemName: any;
  discounts: any;
  coverImage: any;

  restaurantCount: any;
  requestType: any;
  
  distanceCalArray: Array<any>=[];
  distanceArr: Array<any>=[];

  distanceObj = {
    restaurantId: '',
    distance: ''
 };

 CategoryImageUrl: string = '';
 discountVal: string = '';
 dollar: string = '';

 reservationCount: any;
  constructor(public route:ActivatedRoute,
    public restService: RestService,
    public alertService: AlerterrorService,
    public geolocation: Geolocation,
    public toastService: ToasterService,
    public navCtrl: NavController,
    public router: Router) {
      
    this.route.queryParams.subscribe(data =>{
      this.categoryId = data.retaurantDetail;
      this.itemName = data.itemName;
      this.CategoryImageUrl = data.imageUrl;
      this.discountVal = data.value;
      this.dollar = data.dollar;
      if(data.requestType){
        //came from filter page
        this.requestType = data.requestType;
        if(this.requestType == 'price_desc'){
          var stringy = JSON.stringify({
            requestType: 'price_desc',
            categoryId: this.categoryId
          });
          this.loaderShow = true;
          this.distanceCalArray = [];
          this.distanceArr = [];
          this.restService.getFiltersRestaurant(stringy).subscribe(response => {
            console.log(JSON.parse(response['_body']));
            this.singleCategoryData = JSON.parse(response['_body']).restaurant_data;
            console.log(this.singleCategoryData);
            this.restaurantCount = this.singleCategoryData.length;
            this.discounts = JSON.parse(response['_body']).discounts;
            this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
            var catImageShortUrl = JSON.parse(response['_body']).categories_img_url;
            var imageName = this.singleCategoryData[0].image;
            this.CategoryImageUrl = catImageShortUrl + imageName;
            //getting the distance in km's
            for(let i = 0; i < this.singleCategoryData.length; i++){
              this.distanceCalArray.push(this.singleCategoryData[i]);
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
            this.loaderShow = false;
          }, err=> {
          this.loaderShow = false;
          this.alertService.presentAlertService(err);
          });
        }else if(this.requestType == 'price_asc'){
          var stringy = JSON.stringify({
            requestType: 'price_asc',
            categoryId: this.categoryId
          });
          this.loaderShow = true;
          this.distanceCalArray = [];
          this.distanceArr = [];
          this.restService.getFiltersRestaurant(stringy).subscribe(response => {
            console.log(JSON.parse(response['_body']));
            this.singleCategoryData = JSON.parse(response['_body']).restaurant_data;
            console.log(this.singleCategoryData);
            this.restaurantCount = this.singleCategoryData.length;
            this.discounts = JSON.parse(response['_body']).discounts;
            this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
            var catImageShortUrl = JSON.parse(response['_body']).categories_img_url;
            var imageName = this.singleCategoryData[0].image;
            this.CategoryImageUrl = catImageShortUrl + imageName;
             //getting the distance in km's
             for(let i = 0; i < this.singleCategoryData.length; i++){
              this.distanceCalArray.push(this.singleCategoryData[i]);
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
            this.loaderShow = false;
          }, err=> {
          this.loaderShow = false;
          this.alertService.presentAlertService(err);
          });
        }else if(this.requestType == 'rating_asc'){
          var stringy = JSON.stringify({
            requestType: 'rating_asc',
            categoryId: this.categoryId
          });
          this.loaderShow = true;
          this.distanceCalArray = [];
          this.distanceArr = [];
          this.restService.getFiltersRestaurant(stringy).subscribe(response => {
            console.log(JSON.parse(response['_body']));
            this.singleCategoryData = JSON.parse(response['_body']).restaurant_data;
            console.log(this.singleCategoryData);
            this.restaurantCount = this.singleCategoryData.length;
            this.discounts = JSON.parse(response['_body']).discounts;
            this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
            var catImageShortUrl = JSON.parse(response['_body']).categories_img_url;
            var imageName = this.singleCategoryData[0].image;
            this.CategoryImageUrl = catImageShortUrl + imageName;
             //getting the distance in km's
             for(let i = 0; i < this.singleCategoryData.length; i++){
              this.distanceCalArray.push(this.singleCategoryData[i]);
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
            this.loaderShow = false;
          }, err=> {
          this.loaderShow = false;
          this.alertService.presentAlertService(err);
          });
        }else if(this.requestType == 'discount'){
          var stringy = JSON.stringify({
            requestType: 'get_by_discount',
            categoryId: this.categoryId,
            discountVal: this.discountVal
          });
          this.loaderShow = true;
          this.distanceCalArray = [];
          this.distanceArr = [];
          this.restService.getFiltersRestaurant(stringy).subscribe(response => {
            console.log(JSON.parse(response['_body']));
            this.singleCategoryData = JSON.parse(response['_body']).restaurant_data;
            console.log(this.singleCategoryData);
            this.restaurantCount = this.singleCategoryData.length;
            this.discounts = JSON.parse(response['_body']).discounts;
            this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
            var catImageShortUrl = JSON.parse(response['_body']).categories_img_url;
            var imageName = this.singleCategoryData[0].restaurant_image;
            this.CategoryImageUrl = this.coverImage + imageName;
             //getting the distance in km's
             for(let i = 0; i < this.singleCategoryData.length; i++){
              this.distanceCalArray.push(this.singleCategoryData[i]);
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
            this.loaderShow = false;
          }, err=> {
          this.loaderShow = false;
          this.alertService.presentAlertService(err);
          });
        }else if(this.requestType == 'price_range'){
          var stringy = JSON.stringify({
            requestType: 'price_range',
            categoryId: this.categoryId,
            rangeValue: this.dollar
          });
          console.log(stringy);
          this.loaderShow = true;
          this.distanceCalArray = [];
          this.distanceArr = [];
          this.restService.getFiltersRestaurant(stringy).subscribe(response => {
            console.log(JSON.parse(response['_body']));
            this.singleCategoryData = JSON.parse(response['_body']).restaurant_data;
            console.log(this.singleCategoryData);
            if(this.singleCategoryData){
              this.restaurantCount = this.singleCategoryData.length;
            
            
            this.discounts = JSON.parse(response['_body']).discounts;
            this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
            var catImageShortUrl = JSON.parse(response['_body']).categories_img_url;
            var imageName = this.singleCategoryData[0].restaurant_image;
            this.CategoryImageUrl = this.coverImage + imageName;
             //getting the distance in km's
             for(let i = 0; i < this.singleCategoryData.length; i++){
              this.distanceCalArray.push(this.singleCategoryData[i]);
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
          }else {
            this.toastService.presentToastMessage('No restaurant available with this range!');
            this.router.navigate(['/tabs/home']);
          }
            this.loaderShow = false;
          }, err=> {
          this.loaderShow = false;
          this.alertService.presentAlertService(err);
          });
        }
      }else {
        //you came from home page
        console.log(this.categoryId);
        // now send the request to get the data
        var stringy = JSON.stringify({
          requestType: 'by_category',
          categoryId: this.categoryId
        });
        this.loaderShow = true;
        this.distanceCalArray = [];
        this.distanceArr = [];
        this.restService.getSingleCategoryRestaurant(stringy).subscribe(response => {
          this.loaderShow = false;
          console.log(JSON.parse(response['_body']));
          this.singleCategoryData = JSON.parse(response['_body']).restaurant_data;
          console.log(this.singleCategoryData);
          this.restaurantCount = this.singleCategoryData.length;
          this.discounts = JSON.parse(response['_body']).discounts;
          this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
          this.reservationCount = JSON.parse(response['_body']).reservation_count;
          //getting the distance in km's
          for(let i = 0; i < this.singleCategoryData.length; i++){
            this.distanceCalArray.push(this.singleCategoryData[i]);
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
        }, err=> {
        this.loaderShow = false;
        this.alertService.presentAlertService(err);
        });
      }
     
    });
  }

  filtersPage(){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        retaurantDetail: this.categoryId,
        itemName: this.itemName,
        imageUrl: this.CategoryImageUrl
      }
    }
    this.navCtrl.navigateForward(['/filters'] , navigationExtras)
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
  
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  ngOnInit() {
  }
  //open restaurant details
  openRestaurantAsSingle(singleCategoryDat){
    console.log(singleCategoryDat);
    console.log(firebase.auth().currentUser);
   
      let navigationExtras: NavigationExtras = {
        queryParams:{
          id: singleCategoryDat.restaurants_id
        }
      }
      console.log(navigationExtras);
      this.navCtrl.navigateForward(['/singlerestaurant'] , navigationExtras);
  }
  openRestaurantLocationPage(){
   
      let navigationExtras: NavigationExtras = {
        queryParams:{
          retaurantDetail: this.categoryId,
          itemName: this.itemName,
          imageUrl: this.CategoryImageUrl
        }
      }
      this.navCtrl.navigateForward(['/map'] , navigationExtras);
    }

}
