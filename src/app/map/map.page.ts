import { Component, NgZone, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
//import { googlemaps } from 'googlemaps';
import { LoaderService } from '../loader.service';
import { RestService } from '../rest.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlerterrorService } from '../alerterror.service';

import * as firebase from 'firebase';

declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {

  options : GeolocationOptions;
  currentPos : Geoposition;
  places : Array<any> ;
  map:any;

  categoryId: any;
  loaderShow: boolean = false;
  mapsResponse: any;
  latlngArray: any;

  mapResponseLength: any;
  
  centerCords = {
    lat: 30.208372,
    lng: 71.471559
};

imageUrl: any;
itemName: any;

  constructor(private ngZone: NgZone, 
  private geolocation : Geolocation,
  public loader: LoaderService,
  public restService: RestService,
  public router:Router,
  public route: ActivatedRoute,
  public alertService: AlerterrorService
  ) {
    //this.getCategoryRestaurants();
    //this.addMap();
  }
 /* getCategoryRestaurants(){
    //get the category id first
    this.route.queryParams.subscribe(data =>{
      this.categoryId = data.retaurantDetail;
      console.log(this.categoryId);
      // now send the request to get the data
      var stringy = JSON.stringify({
        requestType: 'by_category',
        categoryId: this.categoryId
      });
      this.loaderShow = true;
      this.restService.getSingleCategoryRestaurant(stringy).subscribe(response => {
        this.loaderShow = false;
        console.log(JSON.parse(response['_body']));
        this.mapsResponse = JSON.parse(response['_body']).restaurant_data;
        for(let i = 0; i < this.mapsResponse.length; i++){
          
        }
        this.singleCategoryData = JSON.parse(response['_body']).restaurant_data;
        console.log(this.singleCategoryData);
        this.restaurantCount = this.singleCategoryData.length;
        this.discounts = JSON.parse(response['_body']).discounts;
        this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
      }, err=> {
      this.loaderShow = false;
      this.alertService.presentAlertService(err);
      });

  });

  }
  
  getRestaurants(latLng)
  {
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
      location : latLng,
      radius : 500,
      types: ["restaurant"]
    };
    return new Promise((resolve,reject)=>{
      service.nearbySearch(request,function(results,status){
        if(status === google.maps.places.PlacesServiceStatus.OK)
        {
          resolve(results);    
        }else
        {
          reject(status);
        }
      }); 
    });
  }
  createMarker(place)
  {
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location,
    }); 
    console.log(place.name);
    const infowindow = new google.maps.InfoWindow({
      content: place.name,
      maxWidth: 400
    });
    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    }); 
  }
  addMap(){
    this.geolocation.getCurrentPosition().then((position) => {
     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.getRestaurants(latLng).then((results : Array<any>)=>{
      this.places = results;
      console.log(this.places);
      for(let i = 0 ;i < results.length ; i++)
      {
        console.log(results[i]);
        this.createMarker(results[i]);
      }
      },(status)=>console.log(status));
    });
  } */
  ngOnInit() {
    //get the category id first
    this.route.queryParams.subscribe(data =>{
      this.categoryId = data.retaurantDetail;
      this.itemName = data.itemName;
      this.imageUrl = data.imageUrlzz
      console.log(data);
      // now send the request to get the data
      var stringy = JSON.stringify({
        requestType: 'by_category',
        categoryId: this.categoryId
      });
      this.loaderShow = true;
      this.restService.getSingleCategoryRestaurant(stringy).subscribe(response => {
        this.loaderShow = false;
        console.log(JSON.parse(response['_body']));
        this.mapsResponse = JSON.parse(response['_body']).restaurant_data;
        this.mapResponseLength = this.mapsResponse.length;

        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: this.centerCords
      });
        //this.getMarkers();
       
        this.addMarkerInfo(this.mapsResponse);
        /*this.singleCategoryData = JSON.parse(response['_body']).restaurant_data;
        console.log(this.singleCategoryData);
        this.restaurantCount = this.singleCategoryData.length;
        this.discounts = JSON.parse(response['_body']).discounts;
        this.coverImage = JSON.parse(response['_body']).restaurants_img_url;*/
      }, err=> {
      this.loaderShow = false;
      this.alertService.presentAlertService(err);
      });

  });

    
  }

  displayGoogleMap(mapsResponse) {
    const latLng = new google.maps.LatLng(mapsResponse.latitude, mapsResponse.longitude);
    const mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    console.log(latLng);
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.addInfoWindow(marker, mapsResponse.name , mapsResponse.restaurants_id);
  }

  addInfoWindow(marker, content , id) {
    //if(firebase.auth().currentUser){
      const infoWindow = new google.maps.InfoWindow({
        content
      });
      google.maps.event.addListener(marker, 'click', () => {
        //infoWindow.open(this.map, marker);
        console.log(id);
        let navigationExtras: NavigationExtras = {
          queryParams:{
            id: id,
          }
        }
        this.router.navigate(['/singlerestaurant'] , navigationExtras);
      });
   /* }else {
      this.alertService.presentAlertService('Please login or create an account first');
    }*/
   
  }
  addMarkerInfo(mapResponse) {

         console.log(mapResponse);
    for (var i = 0; i < mapResponse.length; i++) {
       
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(mapResponse[i].latitude, mapResponse[i].longitude),
            map: this.map
        });

        this.addInfoWindow(marker, mapResponse[i].name , mapResponse[i].restaurants_id);

        // marker.addListener('mouseover', function () {
        //     closeOtherInfo();
        //     infowindow.open(marker.get('map'), marker);
        //     InforObj[0] = infowindow;
        // });
        // marker.addListener('mouseout', function () {
        //     closeOtherInfo();
        //     infowindow.close();
        //     InforObj[0] = infowindow;
        // });
    }

}

goToSingleCategory(){
    
  let navigationExtras: NavigationExtras = {
    queryParams:{
      retaurantDetail: this.categoryId,
      itemName: this.itemName,
      imageUrl: this.imageUrl 
    }
  }
  this.router.navigate(['/single-category'] , navigationExtras);
}
openFiltersPage(){
  let navigationExtras: NavigationExtras = {
    queryParams:{
      retaurantDetail: this.categoryId,
      itemName: this.itemName,
      imageUrl: this.imageUrl 
    }
  }
  this.router.navigate(['/filters'] , navigationExtras);
}
 closeOtherInfo() {
   
}
}

