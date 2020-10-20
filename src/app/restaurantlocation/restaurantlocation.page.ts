import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-restaurantlocation',
  templateUrl: './restaurantlocation.page.html',
  styleUrls: ['./restaurantlocation.page.scss'],
})
export class RestaurantlocationPage implements OnInit {

  longitude: any;
  latitude: any;
  map:any;
  name: any;
  image: any;

 
  @ViewChild('map' , {static: true}) mapElement: ElementRef;

   constructor(public location: Location,
    public route: ActivatedRoute) { }
    ionViewWillEnter(){
     
    }

    ngOnInit(){
    this.route.queryParams.subscribe(data =>{
      console.log(data);
      this.longitude = data.longitude;
      this.latitude = data.latitude;
      this.name = data.name;
      this.image = data.image
      console.log(this.longitude , this.latitude);
    });
      
      const latLng = new google.maps.LatLng(this.latitude,this.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      };
      console.log(latLng);
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      const marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      this.addInfoWindow(marker, this.name , this.image );
      
  }
  addInfoWindow(marker, content , image) {
    console.log(image);
      let infoWindow = new google.maps.InfoWindow({
        content: `<div style='float:left'><img id='clickableItem' style='height:60px' src=`+image+`></div><div style='text-align: center; padding: 10px;'><b>`+content+`</b></div>`
      
      });
      infoWindow.open(this.map, marker);

  }
 
  goBack(){
    this.location.back();
  }
 
}
