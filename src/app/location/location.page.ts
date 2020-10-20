import { Component, NgZone, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
//import { googlemaps } from 'googlemaps';
import { LoaderService } from '../loader.service';
import { RestService } from '../rest.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlerterrorService } from '../alerterror.service';

import * as firebase from 'firebase';
import { ToasterService } from '../toaster.service';
import { MenuController, IonLabel } from '@ionic/angular';
import { Storage } from '@ionic/storage';

declare var google;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  cityName: string = '';

  options : GeolocationOptions;
  currentPos : Geoposition;
  places : Array<any> ;
  map:any;

  categoryId: any;
  loaderShow: boolean = false;
  mapsResponse: any;
  reservationCount: any;
  latlngArray: any;

  InforObj = [];
  centerCords = {
        lat: 30.208372,
        lng: 71.471559
    };
     markersOnMap = [{
            placeName: "Australia (Uluru)",
            LatLng: [{
                lat: -25.344,
                lng: 131.036
            }]
        },
        {
            placeName: "Australia (Melbourne)",
            LatLng: [{
                lat: -37.852086,
                lng: 504.985963
            }]
        },
        {
            placeName: "Australia (Canberra)",
            LatLng: [{
                lat: -35.299085,
                lng: 509.109615
            }]
        },
        {
            placeName: "Australia (Gold Coast)",
            LatLng: [{
                lat: -28.013044,
                lng: 513.425586
            }]
        },
        {
            placeName: "Australia (Perth)",
            LatLng: [{
                lat: -31.951994,
                lng: 475.858081
            }]
        }
    ];

    discounts: any;
    
  constructor(private ngZone: NgZone, 
  private geolocation : Geolocation,
  public loader: LoaderService,
  public restService: RestService,
  public toastService: ToasterService,
  public router:Router,
  public menuCtrl: MenuController,
  public route: ActivatedRoute,
  public storage: Storage,
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
  ionViewWillEnter(){
     
    this.initMap();
    this.storage.get('country').then((val) => {
      // console.log('Your age is', val);
      this.cityName = val;
     });
  }
  ngOnInit() {
    this.initMap();
    //get the category id first

      // now send the request to get the data
     /* var stringy = JSON.stringify({
        requestType: 'all',
      });
      this.loaderShow = true;
      this.restService.getHereRestaurants(stringy).subscribe(response => {
        this.loaderShow = false;
        console.log(JSON.parse(response['_body']));
        this.mapsResponse = JSON.parse(response['_body']).restaurant_data;
        
        //this.getMarkers();
        for(let i = 0; i < this.mapsResponse.length; i++){
          this.displayGoogleMap(this.mapsResponse[i]);
        }
      
      }, err=> {
      this.loaderShow = false;
      this.alertService.presentAlertService(err);
      });*/
  }

  displayGoogleMap(mapsResponse) {
    const latLng = new google.maps.LatLng(mapsResponse.latitude, mapsResponse.longitude);
    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    console.log(latLng);
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.addInfoWindow(marker, mapsResponse.name , mapsResponse.restaurants_id , mapsResponse.restaurant_image );
  }


  myDate: any;
  newDate: any;
       
        addMarkerInfo(mapResponse) {
          console.log(mapResponse);
          var infowindow = new google.maps.InfoWindow();
            for (var i = 0; i < mapResponse.length; i++) {
              const icon = {
                url: 'assets/imgs/location-map-icon.svg', // image url//this.baseImage+mapResponse[i].restaurant_image
                scaledSize: new google.maps.Size(40, 40), // scaled size
                labelOrigin: new google.maps.Point(25, 20)
                
              };
              for(let k = 0; k < this.discounts.length; k++){
               //console.log(new Date(this.discounts[0].end_date +','+this.discounts[0].start_time));
               var ONE_HOUR = 60 * 60 * 1000; /* ms */
               this.myDate = new Date(this.discounts[k].end_date +','+this.discounts[k].start_time);
               this.newDate = new Date();
               console.log(this.myDate);
               console.log(this.newDate);
               console.log(this.newDate - this.myDate);
               console.log(ONE_HOUR);
              
                if((mapResponse[i].restaurants_id == this.discounts[k].restaurant_id) && this.newDate != 'Invalid Date' &&((this.newDate - this.myDate) < ONE_HOUR)){
                  console.log(mapResponse[i].restaurants_id);
                  const marker = new google.maps.Marker({
                    position: new google.maps.LatLng(mapResponse[i].latitude, mapResponse[i].longitude),
                    map: this.map,
                    icon: icon,
                    label: {
                      text: this.discounts[k].discount_rate,
                      fontWeight: 'bold',
                      fontSize: '12px',
                      fontFamily: '"Courier New", Courier,Monospace',
                      color: 'white'
                    }
                    //label: {text: mapResponse[i].name, color: "white",
                  // fontSize: "16px", fontWeight: '500' }
                });
              
                // var cityCircle = new google.maps.Circle({
                //   strokeColor: "#000",
                //   strokeOpacity: 0.8,
                //   strokeWeight: 2,
                //   fillColor: "#fff",
                //   fillOpacity: 0.35,
                //   map: this.map,
                //   center: { lat: parseFloat(mapResponse[i].latitude), lng: parseFloat(mapResponse[i].longitude) },
                //   radius: Math.sqrt(12) * 100,
                //   icon: icon,
                //   label: {text: mapResponse[i].name, color: "000",
                //   fontSize: "16px", fontWeight: '500' }
                // });
                //this.addInfoWindow(marker, mapResponse[i].name , mapResponse[i].restaurants_id , mapResponse[i].restaurant_image);

                //var name = mapResponse[i].name;
                // var contentString = '<div id="content">'+
                // '<div id="siteNotice">'+
                // '</div>'+
                // '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                // '<div id="bodyContent">'+
                // '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                // 'sandstone rock formation in the southern part of the '+
                // 'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                // 'south west of the nearest large town, Alice Springs; 450&#160;km '+
                // '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                // 'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                // 'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                // 'Aboriginal people of the area. It has many springs, waterholes, '+
                // 'rock caves and ancient paintings. Uluru is listed as a World '+
                // 'Heritage Site.</p>'+
                // '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                // 'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                // '(last visited June 22, 2009).</p>'+
                // '</div>'+
                // '</div>'+`<div ><img style="width: 170px; height: 100px" src=`+this.baseImage+mapResponse[i].restaurant_image+`></div>`;
                var contentString = `
                
    <ion-card id="mytypecard" (click)="openRestaurantAsSingle(singleCategoryDat)">
      <ion-card-header style="padding: 0;">

        <img style="height: 100px" src=`+this.baseImage+mapResponse[i].restaurant_image+`>
       
        <div style="position: absolute;
        top: 28px;
        background: #e0e0e0;
        color: #000;
        padding: 4px;
        width: 65px;">
          <span>new</span>
        </div>
      
      </ion-card-header>
      <ion-card-content style="padding-right: 0;padding-bottom: 10px;">
      <ion-row style="padding-top: 0;">
        <ion-col style="padding-left: 0;">
          <h3 style="font-weight: 550;"; id="new-restaurant-name">`+mapResponse[i].name+`</h3> 
        </ion-col>
       
      </ion-row>
      <ion-row>
        <ion-col style="padding: 0;padding-right: 5px;">
          <h3 class="new-restaurant-address">`+mapResponse[i].location+`</h3> 
        </ion-col>
       
      </ion-row>
     
    </ion-card-content>
    </ion-card>
  `
                // var infowindow = new google.maps.InfoWindow({
                //   closeBoxURL:"",
                //   content: mapResponse[i].name,
                // });
                // google.maps.event.addListener(marker , 'click', function () {
                //   infowindow.open(this.map, marker);
                  
                // });
                let infoWindow = new google.maps.InfoWindow({
                  content: contentString
                });
                 
                google.maps.event.addListener(marker , 'click', function () {
                  infoWindow.open(this.map, marker);
                  
                });
                }//if cond discounts
              }//for loop discounts
            }
            var infoContent=document.getElementById('mytypecard');
            
        }
 
         closeOtherInfo() {
            if (this.InforObj.length > 0) {
                /* detach the info-window from the marker ... undocumented in the API docs */
                this.InforObj[0].set("marker", null);
                /* and close it */
                this.InforObj[0].close();
                /* blank the array */
                this.InforObj.length = 0;
            }
        }
 
        initMap() {
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: this.centerCords
            });
            this.loaderShow = true;
            var stringy = JSON.stringify({
          requestType: 'all',
        });
            this.restService.getHereRestaurants(stringy).subscribe(response => {
              this.loaderShow = false;
              console.log(JSON.parse(response['_body']));
              this.mapsResponse = JSON.parse(response['_body']).restaurant_data;
              this.baseImage = JSON.parse(response['_body']).restaurants_img_url;
              this.reservationCount = JSON.parse(response['_body']).reservation_count;
              this.discounts = JSON.parse(response['_body']).discounts;
              console.log(this.reservationCount);
              this.addMarkerInfo(this.mapsResponse);
            });
            
        }
        url = 'https://dev.khaoaurbachao.com/assets/admin/images/restaurants_images/rest2.png';
        addInfoWindow(marker, content , id , image) {
          console.log(this.url);
          var url = 'https://dev.khaoaurbachao.com/assets/admin/images/restaurants_images/';
          var img = image;
          img = this.baseImage + img;
            let infoWindow = new google.maps.InfoWindow({
              content: `<div style='float:left'><img id='clickableItem' style='height:60px' src=`+img+`></div><div style='text-align: center; padding: 10px;'><b>`+content+`</b></div>`
            
            });
            //infoWindow.open(this.map, marker);
            google.maps.event.addListener(marker, 'click', () => {
              
              let navigationExtras: NavigationExtras = {
                queryParams:{
                  id: id,
                }
              }
              this.router.navigate(['/singlerestaurant'] , navigationExtras);
             
            });
         
        }
          
    //open search openSearchRestaurant()
    openSearchRestaurant(){
      this.router.navigate(['/searchrestaurant']);
    }
    openSideMenu(){
      this.menuCtrl.toggle();
    }
    addmore(){
      console.log('bc');
    }
    baseImage: any;
    ionViewDidLoad(){
      document.getElementById('clickableItem').addEventListener("click",() => {
        console.log('hs');
      });
    }
    test1(){
     alert("test1");
     return;
    }
    openRestaurantAsSingle(hel){
      console.log('hehelo');
      return 0;
    }
} 
