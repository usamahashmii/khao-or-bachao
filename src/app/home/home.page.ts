import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { RestService } from '../rest.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlerterrorService } from '../alerterror.service';
import { MenuController, Events, Platform, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import * as firebase from 'firebase';
import { ToasterService } from '../toaster.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  userId: any;
  backButtonSubscription: any;

  ngOnInit(){
   
  } 
  pet: string = "puppies";
  isAndroid: boolean = false;
  
  changed: boolean = true;
  
 
  getAllRestaurantsVar: any;
  getTopRestaurantsVar: any;
  getNewRestaurantsVar: any;
  getAZRestaurantsVar: any;

  itemName: string = '';
  categoryName: string = '';
  retaurantCount: string = '';
  coverImage: string = '';

  coverImageBaseUrl: string =  '';

  //check selected tabs
  allRestaurants: boolean = false;
  topRestaurants: boolean = false;
  newRestaurants: boolean = false;
  alphaRestaurants: boolean = false;

  loaderShow: boolean = false;
  discounts: any;

  distanceCalArray: Array<any>=[];
  distanceArr: Array<any>=[];

  distanceObj = {
    restaurantId: '',
    distance: ''
 };

 aResultVar: any;bResultVar: any;cResultVar: any;dResultVar: any;eResultVar: any;
 fResultVar: any;gResultVar: any;hResultVar: any;iResultVar: any;jResultVar: any;
 kResultVar: any;lResultVar: any;mResultVar: any;nResultVar: any;oResultVar: any;
 pResultVar: any;qResultVar: any;rResultVar: any;sResultVar: any;tResultVar: any;
 uResultVar: any;vResultVar: any;wResultVar: any;xResultVar: any;yResultVar: any;
 zResultVar: any;

 showTrimmedAllRestaurants: any;
 showTrimmedNewRestaurants: any;
 showTrimmedTopRestaurants: any;
 showTrimmedAzRestaurants: any;

 showTrimmedAllRestaurantsBool: boolean = false;
 showTrimmedNewRestaurantsBool: boolean = false;
 showTrimmedTopRestaurantsBool: boolean = false;
 showTrimmedAzRestaurantsBool: boolean = false;

 cityName: string = '';
 cityIcon: string = '';
 reservationCount: any;
  constructor(public loader: LoaderService,
    public restService: RestService,
    public router: Router,
    public splash: SplashScreen,
    public navCtrl: NavController,
    //public loaderService: LoaderService,
    public alertService: AlerterrorService,
    public menuCtrl: MenuController,
    public geolocation: Geolocation,
    public toastService: ToasterService,
    public storage: Storage,
    public platform: Platform,
    public events: Events
    ) {
      //this.splash.hide();
      this.pet = 'all';
      if(this.pet == 'all'){
      }
      //this.loaderService.presentLoader();
      var stringy = JSON.stringify({
        requestType: 'all_restaurants'
      });
      //mark the condition which tab is selected
      this.allRestaurants = true;
      this.topRestaurants = false;
      this.newRestaurants = false;
      this.alphaRestaurants = false;
      this.loaderShow = true;
      this.restService.getAllRestaurants(stringy).subscribe(response => {
        
       

        //this.loaderService.hideLoader();
        this.loaderShow = false;
        console.log(JSON.parse(response['_body']));
        if(JSON.parse(response['_body']).status == 'Found'){
          this.getAllRestaurantsVar = JSON.parse(response['_body']).restaurant_data;
          this.coverImageBaseUrl = JSON.parse(response['_body']).categories_img_url; 
        
        }else {
          console.log('No data to Show');
        }
        
      },err => {
        //this.loaderService.hideLoader();
        this.loaderShow = false;
        this.alertService.presentAlertService(err);
      });
    }
  
  //get all restaurants Data
  getAllRestaurantsData(){

   //this.loaderService.presentLoader();
   var stringy = JSON.stringify({
    requestType: 'all_restaurants'
    });
    //mark the condition which tab is selected
    this.allRestaurants = true;
    this.topRestaurants = false;
    this.newRestaurants = false;
    this.alphaRestaurants = false;
    this.loaderShow = true;
    this.restService.getAllRestaurants(stringy).subscribe(response => {
      //this.loaderService.hideLoader();
      this.loaderShow = false;
      if(JSON.parse(response['_body']).status == 'Found'){
        this.getAllRestaurantsVar = JSON.parse(response['_body']).restaurant_data;
        this.coverImageBaseUrl = JSON.parse(response['_body']).categories_img_url; 
      }else {
        console.log('No data to Show');
      }
    },err => {
      //this.loaderService.hideLoader();
      this.loaderShow = false;
      this.alertService.presentAlertService(err);
    });
  }
  //get Top restaurants Data
  getTopRestaurantsData(){
    //this.loaderService.presentLoader();
    this.loaderShow = true;
    var stringy = JSON.stringify({
      requestType: 'top_fifty'
    });
    //mark the condition which tab is selected
    this.allRestaurants = false;
    this.topRestaurants = true;
    this.newRestaurants = false;
    this.alphaRestaurants = false;
   
    this.distanceCalArray = [];
    this.distanceArr = [];
    this.restService.getAllRestaurants(stringy).subscribe(response => {
      this.loaderShow = false;
      //this.loaderService.hideLoader();
      console.log((response['_body']));
      console.log(JSON.parse(response['_body']));
      if(JSON.parse(response['_body']).status == 'Found'){
        this.getTopRestaurantsVar = JSON.parse(response['_body']).restaurant_data;
        this.coverImageBaseUrl = JSON.parse(response['_body']).restaurants_img_url;
        this.discounts = JSON.parse(response['_body']).discounts;
        this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
        this.reservationCount = JSON.parse(response['_body']).reservation_count;
        for(let i = 0; i < this.getTopRestaurantsVar.length; i++){
          this.distanceCalArray.push(this.getTopRestaurantsVar[i]);
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
        console.log('No data Found!');
      }
      
    },err => {
      //this.loaderService.hideLoader();
      this.loaderShow = false;
      this.alertService.presentAlertService(err);
    });
     
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
    //get New restaurants Data
  getNewRestaurantsData(){
    this.loaderShow = true;
    //this.loaderService.presentLoader();
    var stringy = JSON.stringify({
      requestType: 'new'
    });
    //mark the condition which tab is selected
    this.allRestaurants = false;
    this.topRestaurants = false;
    this.newRestaurants = true;
    this.alphaRestaurants = false;
    this.distanceCalArray = [];
    this.distanceArr = [];
    this.restService.getAllRestaurants(stringy).subscribe(response => {
      this.loaderShow = false;
      //this.loaderService.hideLoader();
      console.log(JSON.parse(response['_body']));
      if(JSON.parse(response['_body']).status == 'Found'){
        this.getNewRestaurantsVar = JSON.parse(response['_body']).restaurant_data;
        this.coverImageBaseUrl = JSON.parse(response['_body']).restaurants_img_url;
        this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
        this.reservationCount = JSON.parse(response['_body']).reservation_count;
        this.discounts = JSON.parse(response['_body']).discounts;
        for(let i = 0; i < this.getNewRestaurantsVar.length; i++){
          this.distanceCalArray.push(this.getNewRestaurantsVar[i]);
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
        console.log('No data Found!');
      }
     
    },err => {
      //this.loaderService.hideLoader();
      this.loaderShow = false;
      this.alertService.presentAlertService(err);
    });
    }
   //get AZ restaurants Data
   getAZRestaurantsData(){
    //this.loaderService.presentLoader();
    this.loaderShow = true;
    //mark the condition which tab is selected
    this.allRestaurants = false;
    this.topRestaurants = false;
    this.newRestaurants = false;
    this.alphaRestaurants = true;
    var stringy = JSON.stringify({
      requestType: 'sort_alphabet'
    });

    this.distanceCalArray = [];
    this.distanceArr = [];
    this.restaurantsArray1Top = [];
    this.restaurantsArray1 = [];
    this.restService.getAllRestaurants(stringy).subscribe(response => {
      this.loaderShow = false;
      //this.loaderService.hideLoader();
      console.log(JSON.parse(response['_body']));
      if(JSON.parse(response['_body']).status == 'Found'){
        this.getAZRestaurantsVar = JSON.parse(response['_body']).restaurant_data;
        this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
        this.reservationCount = JSON.parse(response['_body']).reservation_count;
        // for a starting restaurants names
        if(this.getAZRestaurantsVar.a){
          this.aResultVar = this.getAZRestaurantsVar.a;
          for(let i = 0; i < this.aResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.aResultVar[i]);
          }
        }
        // for b starting restaurants names
        if(this.getAZRestaurantsVar.b){
          this.bResultVar = this.getAZRestaurantsVar.b;
          for(let i = 0; i < this.bResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.bResultVar[i]);
          }
        }
        // for c starting restaurants names
        if(this.getAZRestaurantsVar.c){
          this.cResultVar = this.getAZRestaurantsVar.c;
          for(let i = 0; i < this.cResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.cResultVar[i]);
          }
        }
        // for d starting restaurants names
        if(this.getAZRestaurantsVar.d){
          this.dResultVar = this.getAZRestaurantsVar.d;
          for(let i = 0; i < this.dResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.dResultVar[i]);
          }
        }
        // for e starting restaurants names
        if(this.getAZRestaurantsVar.e){
          this.eResultVar = this.getAZRestaurantsVar.e;
          for(let i = 0; i < this.eResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.eResultVar[i]);
          }
        }
        // for f starting restaurants names
        if(this.getAZRestaurantsVar.f){
          this.fResultVar = this.getAZRestaurantsVar.f;
          for(let i = 0; i < this.fResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.fResultVar[i]);
          }
        }
        // for i starting restaurants names
        if(this.getAZRestaurantsVar.i){
          this.iResultVar = this.getAZRestaurantsVar.i;
          for(let i = 0; i < this.iResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.iResultVar[i]);
          }
        }
        // for j starting restaurants names
        if(this.getAZRestaurantsVar.j){
          this.jResultVar = this.getAZRestaurantsVar.j;
          for(let i = 0; i < this.jResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.jResultVar[i]);
          }
        }
        // for k starting restaurants names
        if(this.getAZRestaurantsVar.k){
          this.kResultVar = this.getAZRestaurantsVar.k;
          for(let i = 0; i < this.kResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.kResultVar[i]);
          }
        }
        // for l starting restaurants names
        if(this.getAZRestaurantsVar.l){
          this.lResultVar = this.getAZRestaurantsVar.l;
          for(let i = 0; i < this.lResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.lResultVar[i]);
          }
        }
        // for m starting restaurants names
        if(this.getAZRestaurantsVar.m){
          this.mResultVar = this.getAZRestaurantsVar.m;
          for(let i = 0; i < this.mResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.mResultVar[i]);
          }
        }
        // for n starting restaurants names
        if(this.getAZRestaurantsVar.n){
          this.nResultVar = this.getAZRestaurantsVar.n;
          for(let i = 0; i < this.nResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.nResultVar[i]);
          }
        }
        // for o starting restaurants names
        if(this.getAZRestaurantsVar.o){
          this.oResultVar = this.getAZRestaurantsVar.o;
          for(let i = 0; i < this.oResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.oResultVar[i]);
          }
        }
        // for p starting restaurants names
        if(this.getAZRestaurantsVar.p){
          this.pResultVar = this.getAZRestaurantsVar.p;
          for(let i = 0; i < this.pResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.pResultVar[i]);
          }
        }
        // for q starting restaurants names
        if(this.getAZRestaurantsVar.q){
          this.qResultVar = this.getAZRestaurantsVar.q;
          for(let i = 0; i < this.qResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.qResultVar[i]);
          }
        }
        // for r starting restaurants names
        if(this.getAZRestaurantsVar.r){
          this.rResultVar = this.getAZRestaurantsVar.r;
          for(let i = 0; i < this.rResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.rResultVar[i]);
          }
        }
        // for s starting restaurants names
        if(this.getAZRestaurantsVar.s){
          this.sResultVar = this.getAZRestaurantsVar.s;
          for(let i = 0; i < this.sResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.sResultVar[i]);
          }
        }
        // for t starting restaurants names
        if(this.getAZRestaurantsVar.t){
          this.tResultVar = this.getAZRestaurantsVar.t;
          for(let i = 0; i < this.tResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.tResultVar[i]);
          }
        }
        // for u starting restaurants names
        if(this.getAZRestaurantsVar.u){
          this.uResultVar = this.getAZRestaurantsVar.u;
          for(let i = 0; i < this.uResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.uResultVar[i]);
          }
        }
        // for v starting restaurants names
        if(this.getAZRestaurantsVar.v){
          this.vResultVar = this.getAZRestaurantsVar.v;
          for(let i = 0; i < this.vResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.vResultVar[i]);
          }
        }
        // for w starting restaurants names
        if(this.getAZRestaurantsVar.w){
          this.wResultVar = this.getAZRestaurantsVar.w;
          for(let i = 0; i < this.wResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.wResultVar[i]);
          }
        }
        // for x starting restaurants names
        if(this.getAZRestaurantsVar.x){
          this.xResultVar = this.getAZRestaurantsVar.x;
          for(let i = 0; i < this.xResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.xResultVar[i]);
          }
        }
        // for y starting restaurants names
        if(this.getAZRestaurantsVar.y){
          this.yResultVar = this.getAZRestaurantsVar.y;
          for(let i = 0; i < this.yResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.yResultVar[i]);
          }
        }
        // for z starting restaurants names
        if(this.getAZRestaurantsVar.z){
          this.zResultVar = this.getAZRestaurantsVar.z;
          for(let i = 0; i < this.zResultVar.length; i++){
            this.restaurantsArrayTopaz.push(this.zResultVar[i]);
          }
        }
        
        this.coverImageBaseUrl = JSON.parse(response['_body']).restaurants_img_url;
        this.discounts = JSON.parse(response['_body']).discounts;
        if(this.aResultVar){
          for(let i = 0; i < this.aResultVar.length; i++){
            this.distanceCalArray.push(this.aResultVar[i]);
          }
        }
        if(this.bResultVar){
          for(let i = 0; i < this.bResultVar.length; i++){
            this.distanceCalArray.push(this.bResultVar[i]);
          }
        }
        if(this.cResultVar){
          for(let i = 0; i < this.cResultVar.length; i++){
            this.distanceCalArray.push(this.cResultVar[i]);
          }
        }
        if(this.dResultVar){
          for(let i = 0; i < this.dResultVar.length; i++){
            this.distanceCalArray.push(this.dResultVar[i]);
          }
        }
        if(this.eResultVar){
          for(let i = 0; i < this.eResultVar.length; i++){
            this.distanceCalArray.push(this.eResultVar[i]);
          }
        }
        if(this.fResultVar){
          for(let i = 0; i < this.fResultVar.length; i++){
            this.distanceCalArray.push(this.fResultVar[i]);
          }
        }
        if(this.gResultVar){
          for(let i = 0; i < this.gResultVar.length; i++){
            this.distanceCalArray.push(this.gResultVar[i]);
          }
        }
        if(this.hResultVar){
          for(let i = 0; i < this.hResultVar.length; i++){
            this.distanceCalArray.push(this.hResultVar[i]);
          }
        }
        if(this.iResultVar){
          for(let i = 0; i < this.iResultVar.length; i++){
            this.distanceCalArray.push(this.iResultVar[i]);
          } 
        }
        if(this.jResultVar){
          for(let i = 0; i < this.jResultVar.length; i++){
            this.distanceCalArray.push(this.jResultVar[i]);
          }
        }
        if(this.kResultVar){
          for(let i = 0; i < this.kResultVar.length; i++){
            this.distanceCalArray.push(this.kResultVar[i]);
          }
        }
        if(this.lResultVar){
          for(let i = 0; i < this.lResultVar.length; i++){
            this.distanceCalArray.push(this.lResultVar[i]);
          }
        }
        if(this.mResultVar){
          for(let i = 0; i < this.mResultVar.length; i++){
            this.distanceCalArray.push(this.mResultVar[i]);
          }
        }
        if(this.nResultVar){
          for(let i = 0; i < this.nResultVar.length; i++){
            this.distanceCalArray.push(this.nResultVar[i]);
          }
        }
        if(this.oResultVar){
          for(let i = 0; i < this.oResultVar.length; i++){
            this.distanceCalArray.push(this.oResultVar[i]);
          }
        }
        if(this.pResultVar){
          for(let i = 0; i < this.pResultVar.length; i++){
            this.distanceCalArray.push(this.pResultVar[i]);
          }
        }
        if(this.qResultVar){
          for(let i = 0; i < this.qResultVar.length; i++){
            this.distanceCalArray.push(this.qResultVar[i]);
          }
        }
        if(this.rResultVar){
          for(let i = 0; i < this.rResultVar.length; i++){
            this.distanceCalArray.push(this.rResultVar[i]);
          }
        }
        if(this.sResultVar){
          for(let i = 0; i < this.sResultVar.length; i++){
            this.distanceCalArray.push(this.sResultVar[i]);
          }
        }
        if(this.tResultVar){
          for(let i = 0; i < this.tResultVar.length; i++){
            this.distanceCalArray.push(this.tResultVar[i]);
          }
        }
        if(this.uResultVar){
          for(let i = 0; i < this.uResultVar.length; i++){
            this.distanceCalArray.push(this.uResultVar[i]);
          }
        }
        if(this.vResultVar){
          for(let i = 0; i < this.vResultVar.length; i++){
            this.distanceCalArray.push(this.vResultVar[i]);
          }
        }
        if(this.wResultVar){
          for(let i = 0; i < this.wResultVar.length; i++){
            this.distanceCalArray.push(this.wResultVar[i]);
          }
        }
        if(this.xResultVar){
          for(let i = 0; i < this.xResultVar.length; i++){
            this.distanceCalArray.push(this.xResultVar[i]);
          }
        }
        if(this.yResultVar){
          for(let i = 0; i < this.yResultVar.length; i++){
            this.distanceCalArray.push(this.yResultVar[i]);
          }
        }
        if(this.zResultVar){
          for(let i = 0; i < this.zResultVar.length; i++){
            this.distanceCalArray.push(this.zResultVar[i]);
          }
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
        console.log('No data Found!');
      }
    } , err => {
      this.loaderShow = false;
      this.alertService.presentAlertService('Some network error occurred');
    });

    }

  //open restaurant Details
  openRestaurantDetails(openRestaurantDetail){
    console.log(openRestaurantDetail.categories_id);
    
    let navigationExtras: NavigationExtras = {
      queryParams:{
        retaurantDetail: openRestaurantDetail.categories_id,
        itemName: openRestaurantDetail.item_name,
        imageUrl: this.coverImageBaseUrl + openRestaurantDetail.category_image 
      }
    }
    this.navCtrl.navigateForward(['/single-category'] , navigationExtras);
  }

  // refresh content
  doRefresh(event) {
    // refreshing get all restaurants
    if(this.allRestaurants){
      console.log('Begin async operation');
      setTimeout(() => {
        var stringy = JSON.stringify({
          requestType: 'all_restaurants'
        });
       this.restService.getAllRestaurants(stringy).subscribe(response => {
          console.log('Async operation has ended');
          event.target.complete();
          //this.loaderService.hideLoader();
          console.log(response['_body']);
          if(JSON.parse(response['_body']).status == 'Found'){
            this.getAllRestaurantsVar = JSON.parse(response['_body']).restaurant_data;
            this.coverImageBaseUrl = JSON.parse(response['_body']).categories_img_url; 
          }else {
            console.log('No data to Show');
          }
          
        },err => {
          event.target.complete();
          //this.loaderService.hideLoader();
          this.alertService.presentAlertService(err);
        });
      }, 2000);
      
    }else if(this.newRestaurants){
      var stringy = JSON.stringify({
        requestType: 'new'
      });
      this.restService.getAllRestaurants(stringy).subscribe(response => {
        //this.loaderService.hideLoader();
        this.distanceArr = [];
        this.distanceCalArray = [];
        event.target.complete();
        console.log(JSON.parse(response['_body']));
        if(JSON.parse(response['_body']).status == 'Found'){
          this.getNewRestaurantsVar = JSON.parse(response['_body']).restaurant_data;
          this.coverImageBaseUrl = JSON.parse(response['_body']).restaurants_img_url;
          this.discounts = JSON.parse(response['_body']).discounts;
        for(let i = 0; i < this.getTopRestaurantsVar.length; i++){
          this.distanceCalArray.push(this.getTopRestaurantsVar[i]);
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
          console.log('No data Found!');
        }
        
      },err => {
        //this.loaderService.hideLoader();
        event.target.complete();
        this.alertService.presentAlertService(err);
      });
    }else if(this.topRestaurants){
      
      var stringy = JSON.stringify({
        requestType: 'top_fifty'
      });
      this.restService.getAllRestaurants(stringy).subscribe(response => {
        this.distanceArr = [];
        this.distanceCalArray = [];
        //this.loaderService.hideLoader();
        event.target.complete();
        console.log(JSON.parse(response['_body']));
        if(JSON.parse(response['_body']).status == 'Found'){
          this.getTopRestaurantsVar = JSON.parse(response['_body']).restaurant_data;
          this.coverImageBaseUrl = JSON.parse(response['_body']).restaurants_img_url;
          this.discounts = JSON.parse(response['_body']).discounts;
        for(let i = 0; i < this.getTopRestaurantsVar.length; i++){
          this.distanceCalArray.push(this.getTopRestaurantsVar[i]);
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
        });
        }else {
          console.log('No data Found!');
        }
      },err => {
        //this.loaderService.hideLoader();
        event.target.complete();
        this.alertService.presentAlertService(err);
      });
    }else{
      event.target.complete();
      /*this.loaderService.presentLoader();
      this.restService.getAZRestaurants().subscribe(response => {
        this.loaderService.hideLoader();
         event.target.complete();
        console.log(response['_body']);
        this.getAZRestaurantsVar = JSON.parse(response['_body']);
      },err => {
        this.loaderService.hideLoader();
         event.target.complete();
        this.alertService.presentAlertService(err);
      });*/
    }
  }

  openRestaurantAsSingle(singleCategoryDat){
    console.log(singleCategoryDat);
   // if(firebase.auth().currentUser){
      let navigationExtras: NavigationExtras = {
        queryParams:{
          id: singleCategoryDat.restaurants_id
        }
      }
      this.navCtrl.navigateForward(['/singlerestaurant'] , navigationExtras);
    /*}else {
      this.toastService.presentToastMessage('Please login or create an account first!');
    }*/
   
  }
  restaurantsArray: { items_id: string, item_name: string ,
    price: string,
    description: string,
    status: string,
    categories_id: string,
    restaurant_id: string,
    price_range: string,
    category_name: string,
    category_image: string,
    category_repeated: string,
    restaurant_count: string

   }[] = [];

   restaurantsArray1: { items_id: string, item_name: string ,
    price: string,
    description: string,
    status: string,
    categories_id: string,
    restaurant_id: string,
    price_range: string,
    category_name: string,
    category_image: string,
    category_repeated: string,
    restaurant_count: string

   }[] = [];

  restaurantObj: { items_id: string, item_name: string ,
    price: string,
    description: string,
    status: string,
    categories_id: string,
    restaurant_id: string,
    price_range: string,
    category_name: string,
    category_image: string,
    category_repeated: string,
    restaurant_count: string

  };

  // top/new
  restaurantsArrayTop: { rating_sum: string, rating_count: string ,
    rating_average: string,
    restaurant_id: string,
    restaurants_id: string,
    name: string,
    restaurant_image: string,
    location: string,
    city: string,
    date_added: string,
    latitude: string,
    longitude: string
    overview: string,
    terms_conditions: string
   }[] = [];

   restaurantsArray1Top: { rating_sum: string, rating_count: string ,
    rating_average: string,
    restaurant_id: string,
    restaurants_id: string,
    name: string,
    restaurant_image: string,
    location: string,
    city: string,
    date_added: string,
    latitude: string,
    longitude: string
    overview: string,
    terms_conditions: string

   }[] = [];

  restaurantObjTop: { rating_sum: string, rating_count: string ,
    rating_average: string,
    restaurant_id: string,
    restaurants_id: string,
    name: string,
    restaurant_image: string,
    location: string,
    city: string,
    date_added: string,
    latitude: string,
    longitude: string
    overview: string,
    terms_conditions: string

  };


  // a-z
  
  restaurantsArrayTopaz: { rating_sum: string, rating_count: string ,
    rating_average: string,
    restaurant_id: string,
    restaurants_id: string,
    name: string,
    restaurant_image: string,
    location: string,
    city: string,
    date_added: string,
    latitude: string,
    longitude: string
    overview: string,
    terms_conditions: string
   }[] = [];

   restaurantsArray1Topaz: { rating_sum: string, rating_count: string ,
    rating_average: string,
    restaurant_id: string,
    restaurants_id: string,
    name: string,
    restaurant_image: string,
    location: string,
    city: string,
    date_added: string,
    latitude: string,
    longitude: string
    overview: string,
    terms_conditions: string

   }[] = [];

  restaurantObjTopaz: { rating_sum: string, rating_count: string ,
    rating_average: string,
    restaurant_id: string,
    restaurants_id: string,
    name: string,
    restaurant_image: string,
    location: string,
    city: string,
    date_added: string,
    latitude: string,
    longitude: string
    overview: string,
    terms_conditions: string

  };


  searchChanged(ev){
    if(this.allRestaurants){
        this.restaurantsArray = this.getAllRestaurantsVar;
        this.restaurantsArray1 = this.restaurantsArray;
        //this.trimmFunction(ev);
        console.log(ev.target.value);
      let serVal = ev.target.value;
      if (serVal && serVal.trim() != '') {
        for(let i=0; i<this.restaurantsArray1.length; i++){
        this.restaurantsArray1 = this.restaurantsArray1.filter((restaurant: {items_id: string, item_name: string ,
          price: string,
          description: string,
          status: string,
          categories_id: string,
          restaurant_id: string,
          price_range: string,
          category_name: string,
          category_image: string,
          category_repeated: string,
          restaurant_count: string
        }) => {
          return (restaurant.category_name.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
          });
          }
           //console.log(this.restaurantsArray1);
      const filteredArr = this.restaurantsArray1.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.categories_id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      console.log(filteredArr);
      this.showTrimmedAllRestaurants = filteredArr;
      this.showTrimmedAllRestaurantsBool = true;
     
      }else {
        //this.showTrimmedAllRestaurants = [];
        this.showTrimmedAllRestaurantsBool = false;
        console.log('emt');
      }
    }else if(this.newRestaurants){
      this.restaurantsArrayTop = this.getNewRestaurantsVar;
      this.restaurantsArray1Top = this.restaurantsArrayTop;
     // this.trimmFunction(ev);
     console.log(ev.target.value);
      console.log(this.restaurantsArray1Top);
      let serVal = ev.target.value;
      if (serVal && serVal.trim() != '') {
        for(let i=0; i<this.restaurantsArray1Top.length; i++){
        this.restaurantsArray1Top = this.restaurantsArray1Top.filter((restaurant: {rating_sum: string, rating_count: string ,
          rating_average: string,
          restaurant_id: string,
          restaurants_id: string,
          name: string,
          restaurant_image: string,
          location: string,
          city: string,
          date_added: string,
          latitude: string,
          longitude: string
          overview: string,
          terms_conditions: string
        }) => {
          return (restaurant.name.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
          });
          }
          console.log(this.restaurantsArray1);
          const filteredArr = this.restaurantsArray1Top.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.restaurants_id);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []);
          console.log(filteredArr);
          this.showTrimmedNewRestaurants = filteredArr;
          this.showTrimmedNewRestaurantsBool = true;
      }else {
        //this.showTrimmedNewRestaurants = [];
        this.showTrimmedNewRestaurantsBool = false;
      }
     
      
    }else if(this.topRestaurants){
      this.restaurantsArrayTop = this.getTopRestaurantsVar;
      this.restaurantsArray1Top = this.restaurantsArrayTop;
      //this.trimmFunction(ev);
      let serVal = ev.target.value;
      if (serVal && serVal.trim() != '') {
        for(let i=0; i<this.restaurantsArray1Top.length; i++){
        this.restaurantsArray1Top = this.restaurantsArray1Top.filter((restaurant: {rating_sum: string, rating_count: string ,
          rating_average: string,
          restaurant_id: string,
          restaurants_id: string,
          name: string,
          restaurant_image: string,
          location: string,
          city: string,
          date_added: string,
          latitude: string,
          longitude: string
          overview: string,
          terms_conditions: string
        }) => {
          return (restaurant.name.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
          });
          }
            //console.log(this.restaurantsArray1);
      const filteredArr = this.restaurantsArray1Top.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.restaurants_id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      console.log(filteredArr);
      this.showTrimmedTopRestaurants = filteredArr;
      this.showTrimmedTopRestaurantsBool = true;
      }else {
        //this.showTrimmedTopRestaurants = [];
        this.showTrimmedTopRestaurantsBool = false;
      }
    
    }else if(this.alphaRestaurants){

     
      console.log(this.restaurantsArrayTopaz);
      this.restaurantsArray1Topaz = this.restaurantsArrayTopaz;
     // this.restaurantsArray1Top = this.restaurantsArrayTop;

      //this.trimmFunction(ev);
      let serVal = ev.target.value;
      if (serVal && serVal.trim() != '') {
        for(let i=0; i<this.restaurantsArray1Topaz.length; i++){
        this.restaurantsArray1Topaz = this.restaurantsArray1Topaz.filter((restaurant: {rating_sum: string, rating_count: string ,
          rating_average: string,
          restaurant_id: string,
          restaurants_id: string,
          name: string,
          restaurant_image: string,
          location: string,
          city: string,
          date_added: string,
          latitude: string,
          longitude: string
          overview: string,
          terms_conditions: string
        }) => {
          return (restaurant.name.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
          });
          }
          //console.log(this.restaurantsArray1);
      const filteredArr = this.restaurantsArray1Topaz.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.restaurants_id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      console.log(filteredArr);
      this.showTrimmedAzRestaurants = filteredArr;
      this.showTrimmedAzRestaurantsBool = true;
      }else {
        this.showTrimmedAzRestaurants = [];
        this.showTrimmedAzRestaurantsBool = false;
      }
      
    }
  }
  trimmFunction(ev){
    
    }
    
    openCountryPage(){
      this.navCtrl.navigateForward(['/countries']);
    }
    //open search openSearchRestaurant()
    openSearchRestaurant(){
      this.navCtrl.navigateForward(['/searchrestaurant']);
    }
    chooseCity(){
      this.navCtrl.navigateForward(['/countries']);
    }
    ionViewWillEnter(){
      this.menuCtrl.enable(true);
      // Or to get a key/value pair
      // this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      //   navigator['app'].exitApp();
      // });
      console.log('IONVIEWWILWENTER!');
      this.userId = localStorage.getItem('userId');
      var stringy = JSON.stringify({
        userId: this.userId
      });
      this.restService.getUserCity(stringy).subscribe(data => {
        console.log(data);
        this.cityName = JSON.parse(data['_body']).city_name;
        this.cityIcon = JSON.parse(data['_body']).city_logo;
      } , err => {
        console.log(err);
      });
    }
    
  
    ngOnDestroy() {
      // console.log('router leave');
      // this.backButtonSubscription.unsubscribe();
    }
    
}
