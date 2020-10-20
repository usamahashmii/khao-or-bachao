import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  createAccountUrl = 'http://dev.khaoaurbachao.com/Webservices/signup';
  UpdateProfileUrl = 'http://dev.khaoaurbachao.com/Webservices/update_user';
  getAllRestaurantsUrl = 'http://dev.khaoaurbachao.com/Webservices/get_restaurants';//get all retaurants , top restaurrants,new restaurants
  getSingleCategoryRestauranyUrl = 'http://dev.khaoaurbachao.com/Webservices/get_restaurants';
  filtersUrl = 'http://dev.khaoaurbachao.com/Webservices/filters';
  singleRestaurantDetailUrl = 'http://dev.khaoaurbachao.com/Webservices/restaurant_details';
  getAboutDataUrl = 'http://dev.khaoaurbachao.com/Webservices/restaurant_details';
  getRestaurantReviewsUrl = 'http://dev.khaoaurbachao.com/Webservices/restaurant_details';
  sendRestaurantReviewsUrl = 'http://dev.khaoaurbachao.com/Webservices/save_review';
  confirmReservationForUserUrl = 'http://dev.khaoaurbachao.com/Webservices/reservations';
  favouriteRestaurantUrl = 'https://dev.khaoaurbachao.com/Webservices/fav_restaurants';
  allhereRestaurantsUrl = 'https://dev.khaoaurbachao.com/Webservices/get_restaurants';

  setCountryUrl = '';
  getTopRestaurantsUrl = '';
  getNewRestaurantsUrl = '';
  getAZRestaurantsUrl = '';
  getReservationDetailsUrl = '';
  getFavoritesUrl = '';

  getpreviousReservationsUrl = 'http://dev.khaoaurbachao.com/Webservices/reservations';
  getupcomingReservationsUrl = 'http://dev.khaoaurbachao.com/Webservices/reservations';
  recentRestaurantUrl = 'http://dev.khaoaurbachao.com/Webservices/recently_viewed';
  getNotificationsUrl = 'https://dev.khaoaurbachao.com/Webservices/notifications';
  
  getCountriesUrl = 'https://dev.khaoaurbachao.com/Webservices/get_countries_cities';

  updateProfileUrl = 'https://dev.khaoaurbachao.com/Webservices/update_user';

  getUserCityUrl = 'https://dev.khaoaurbachao.com/Webservices/get_user_city';
  emailUsUrl = 'https://dev.khaoaurbachao.com/Webservices/email_us';
  
  restaurantemailUsUrl = 'https://dev.khaoaurbachao.com/Webservices/email_us'
  oneSignalUrl = 'https://dev.khaoaurbachao.com/Webservices/onesignal_update';
  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }
  //create user account
  createAccountCall(data){
    console.log(data);
    return this.http.post(this.createAccountUrl , data);
  }
  //update user data
  updateUserData(data){
    console.log(data);
    return this.http.post(this.UpdateProfileUrl , data);
  }
  //get all restaurants data
  getAllRestaurants(data){
    return this.http.post(this.getAllRestaurantsUrl , data);
  }
  //notifications
  getSingleCategoryRestaurant(data){
    console.log(data);
    return this.http.post(this.getSingleCategoryRestauranyUrl , data);
  }
  //single restaurant details
  getSingleRestaurantDetails(data){
    console.log(data);
    return this.http.post(this.singleRestaurantDetailUrl , data);
  }
  //single restaurant details
  getAboutSection(data){
    console.log(data);
    return this.http.post(this.getAboutDataUrl , data);
  }
  //single restaurant details
  getReviewSection(data){
    console.log(data);
    return this.http.post(this.getRestaurantReviewsUrl , data);
  }
  //single restaurant details
  sendReviewSection(data){
    console.log(data);
    return this.http.post(this.sendRestaurantReviewsUrl , data);
  }
  //single restaurant details
  confirmReservationForUser(data){
    console.log(data);
    return this.http.post(this.confirmReservationForUserUrl , data);
  }
   //favourite restaurant details
   favouriteRestaurant(data){
    console.log(data);
    return this.http.post(this.favouriteRestaurantUrl , data);
  }
   //get all here restaurant details
   getHereRestaurants(data){
    console.log(data);
    return this.http.post(this.allhereRestaurantsUrl , data);
  }
   //set country 
   setCountry(data){
    console.log(data);
    return this.http.post(this.setCountryUrl , data);
  }
  //notifications
  getFiltersRestaurant(data){
    console.log(data);
    return this.http.post(this.filtersUrl , data);
  }
   //get all restaurants data
   getTopRestaurants(){
    return this.http.get(this.getTopRestaurantsUrl);
  }
   //get all restaurants data
   getNewRestaurants(){
    return this.http.get(this.getNewRestaurantsUrl);
  }
  //get az restaurants data
  getAZRestaurants(){
    return this.http.get(this.getAZRestaurantsUrl);
  }
  //reservations details
  reservations(data){
    return this.http.post(this.getReservationDetailsUrl , data);
  }
  //reservations details
  favorites(data){
    return this.http.post(this.getFavoritesUrl , data);
  }
  //reservations
  previousReservations(data){
    return this.http.post(this.getpreviousReservationsUrl , data);
  }
  upcomingReservations(data){
    return this.http.post(this.getupcomingReservationsUrl , data);
  }
  //notifications
  notifications(data){
    console.log(data);
    return this.http.post(this.getNotificationsUrl , data);
  }

  //recent restaurant  
  recentRestaurant(data){
    return this.http.post(this.recentRestaurantUrl , data);
  }
  getCountries(data){
    return this.http.post(this.getCountriesUrl , data);
  }
  updateProfile(data){
    console.log(data);
    return this.http.post(this.updateProfileUrl , data);
  }
  getUserCity(data){
    return this.http.post(this.getUserCityUrl , data);
  }
  emailUs(data){
    return this.http.post(this.emailUsUrl , data);
  }
  restaurantemailUs(data){
    return this.http.post(this.restaurantemailUsUrl , data);
  }
  onesignalUpdate(data){
    return this.http.post(this.oneSignalUrl , data);
  }
}
