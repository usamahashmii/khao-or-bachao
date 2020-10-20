import { Component, OnInit } from '@angular/core';
import { AlerterrorService } from '../alerterror.service';
import { LoaderService } from '../loader.service';
import { ToasterService } from '../toaster.service';
import { RestService } from '../rest.service';
import { FirebaseauthService } from '../firebaseauth.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as firebase from 'firebase';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage {// implements OnInit

  userId: string = ''
  favorites: any;
  loaderShow: boolean = false;

  distanceCalArray: Array<any>=[];
  distanceArr: Array<any>=[];

  distanceObj = {
    restaurantId: '',
    distance: ''
 };
 singleCategoryData: any;

 noDataText: boolean = false;
 cityName: string = '';
 coverImage: any;
 discounts: any;
  constructor(public alertService: AlerterrorService,
    public router: Router,
    public loader: LoaderService,
    public toastService: ToasterService,
    public restService: RestService,
    public geolocation: Geolocation,
    public menuCtrl: MenuController,
    public storage: Storage,
    public firebase: FirebaseauthService) { }

  ionViewWillEnter(){
    this.storage.get('country').then((val) => {
      // console.log('Your age is', val);
      this.cityName = val;
     });

    if(firebase.auth().currentUser){
      this.userId = firebase.auth().currentUser.uid;
    var stringy=JSON.stringify({
      requestType: 'get_fav',
      userID: this.userId
    });
    this.loaderShow = true;
    this.distanceCalArray = [];
    this.distanceArr = [];
    this.restService.favouriteRestaurant(stringy).subscribe(response => {
      this.loaderShow = false;
      console.log(JSON.parse(response['_body']));
      this.distanceCalArray = [];
      this.distanceArr = [];
      this.favorites = JSON.parse(response['_body']).fav_restaurants;
      this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
      //call firebase to get the reservation owner data
      if(this.favorites.length == 0){
        this.noDataText = true;
      }else {
        this.noDataText = false;
      }
      //getting the distance in km's
      for(let i = 0; i < this.favorites.length; i++){
        this.distanceCalArray.push(this.favorites[i]);
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

    },err => {
      this.loaderShow = true;
      this.toastService.presentToastMessage('Error in getting favourites!');
    });
    }else {
      this.alertService.presentAlertService('Please login or create an account first!');
    }  
  }
  ngOnInit() {
  
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
  //open restaurant details
  openRestaurantAsSingle(favorites){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        id: favorites.restaurants_id
      }
    }
    this.router.navigate(['/singlerestaurant'] , navigationExtras);
  }
  //remove from fav
  removeFromLike(fav){
    this.userId = firebase.auth().currentUser.uid;
    var stringy = JSON.stringify({
      requestType: 'remove_fav',
      userID: this.userId,
      restaurantId: fav.restaurants_id
    });
      this.loaderShow = true;
    this.restService.favouriteRestaurant(stringy).subscribe(response => {
      this.loaderShow = false;
      console.log(JSON.parse(response['_body']));
      this.toastService.presentToastMessage('Successfully removed from favourites!');
      this.router.navigate(['/tabs/home']);
    } ,err => {
      this.loaderShow = false;
      this.alertService.presentAlertService('Some network error occured');
    })
  }
  openSideMenu(){
    this.menuCtrl.toggle();
  }
    
    //open search openSearchRestaurant()
    openSearchRestaurant(){
      this.router.navigate(['/searchrestaurant']);
    }

  
    chooseCity(){
      this.router.navigate(['/countries']);
    }
}
