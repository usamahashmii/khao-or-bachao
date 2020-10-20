import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-searchrestaurant',
  templateUrl: './searchrestaurant.page.html',
  styleUrls: ['./searchrestaurant.page.scss'],
})
export class SearchrestaurantPage implements OnInit {
  loaderShow: boolean = false;
  mapsResponse: any;


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
  showTrimmedAllRestaurantsBool: boolean = false;
  showTrimmedNewRestaurantsBool: boolean = false;

  distanceCalArray: Array<any>=[];
  distanceArr: Array<any>=[];

  distanceObj = {
    restaurantId: '',
    distance: ''
 };
 coverImageBaseUrl: any;
 discounts: any;

 reservationCount: any;
 
 coverImage: any;
  constructor(public router: Router,
    public geolocation: Geolocation,
    public restService: RestService) { }

  ngOnInit() {
    this.loaderShow = true;
    var stringy = JSON.stringify({
      requestType: 'all',
    });
    this.restService.getHereRestaurants(stringy).subscribe(response => {
      this.loaderShow = false;
      console.log(JSON.parse(response['_body']));
      this.mapsResponse = JSON.parse(response['_body']).restaurant_data;
      this.coverImageBaseUrl = JSON.parse(response['_body']).restaurants_img_url;
      this.coverImage = JSON.parse(response['_body']).restaurants_img_url;
      this.reservationCount = JSON.parse(response['_body']).reservation_count;
      this.discounts = JSON.parse(response['_body']).discounts;
      for(let i = 0; i < this.mapsResponse.length; i++){
        this.distanceCalArray.push(this.mapsResponse[i]);
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
  
  goBack(){
    this.router.navigate(['/tabs/home']);
  }
  
  searchChanged(ev){
    this.restaurantsArray1Topaz = this.mapsResponse;
   // this.restaurantsArray1Top = this.restaurantsArrayTop;
   // this.trimmFunction(ev);
   console.log(ev.target.value);
    console.log(this.restaurantsArray1Topaz);
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
        const filteredArr = this.restaurantsArray1Topaz.reduce((acc, current) => {
          const x = acc.find(item => item.id === current.restaurants_id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        console.log(filteredArr);
        this.restaurantsArrayTopaz = filteredArr;
        this.showTrimmedNewRestaurantsBool = true;
    }else {
      //this.showTrimmedNewRestaurants = [];
      this.showTrimmedNewRestaurantsBool = false;
    }
  }
  openRestaurantAsSingle(val){

  }
}
