import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { RestService } from '../rest.service';
import { AlerterrorService } from '../alerterror.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.page.html',
  styleUrls: ['./recent.page.scss'],
})
export class RecentPage implements OnInit {

  userId: string = '';
  recentObj: any;
  recent: Array<any> = [];

  loaderShow: boolean = false;
  distanceCalArray: Array<any>=[];
  distanceArr: Array<any>=[];

  distanceObj = {
    restaurantId: '',
    distance: ''
 };

 getTopRestaurantsVar: any;
 coverImageBaseUrl: any;
 discounts: any;

 userAuth: boolean = false;
 coverImage: any;

 reservationCount: any;
  constructor(public restService: RestService,
    public geolocation: Geolocation,
    public navCtrl: NavController,
    public alertService: AlerterrorService) { }
  

  ionViewWillEnter() {
    console.log('hr');
    if(firebase.auth().currentUser){
      this.userAuth = true;
      /*console.log('hr');
      this.userId = firebase.auth().currentUser.uid;
      firebase.database().ref('recentlyView/'+this.userId)
      .once("value" , snapshot => {
        if(snapshot.val()){
          this.recent = [];
          console.log(snapshot.val());
          this.recentObj = snapshot.val();
          this.recent.push(this.recentObj);
        }
      });*/
      this.userId = firebase.auth().currentUser.uid;
      var stringy = JSON.stringify({
        userID: this.userId,
        requestType: 'get',
      });
      //mark the condition which tab is selected
    
      this.distanceCalArray = [];
      this.distanceArr = [];
      this.restService.recentRestaurant(stringy).subscribe(response => {
        this.loaderShow = false;
        //this.loaderService.hideLoader();
        console.log((response['_body']));
        console.log(JSON.parse(response['_body']));
        if(JSON.parse(response['_body']).status == 'Found'){
          this.getTopRestaurantsVar = JSON.parse(response['_body']).recently_viewed;
          this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
          this.coverImageBaseUrl = JSON.parse(response['_body']).restaurants_img_url;
          this.reservationCount = JSON.parse(response['_body']).reservation_count;
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
        this.loaderShow = false;
        this.alertService.presentAlertService(err);
      });
    }else {
      this.userAuth = false;
    }
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
  ngOnInit(){}
  
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
}
