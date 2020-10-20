import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController, Events, NavController } from '@ionic/angular';
import { RestService } from '../rest.service';

import * as firebase from 'firebase';
import { AlerterrorService } from '../alerterror.service';
import { ToasterService } from '../toaster.service';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {

  userId: string = '';
  
  loaderShow: boolean = false;

  showPakCities: boolean = false;
  showSaCities: boolean = false;
  showSkCities: boolean = false;
  showSweCities: boolean = false;
  showHunCities: boolean = false;
  showMexCities: boolean = false;
  showIndCities: boolean = false;
  showHkCities: boolean = false;

  getAllCountries: any;
  getResponse: any;
  getAllCities: any;
  city_logo_path: any;
  selectedIndex: any;

  country_logo_path: string = '';

  breakcountryPath1: string = '';
  breakcountryPath2: string = '';

  shouldShowCancel: any;
  constructor(public menuCtrl: MenuController,
    public alertCtrl: AlerterrorService,
    public toastCtrl: ToasterService,
    public location: Location,
    public storage: Storage,
    public router: Router,
    public events: Events,
    public navCtrl: NavController,
    public restService: RestService) { }

  ngOnInit() {
    this.loaderShow = true;
    var stirngy = JSON.stringify({
      requestType: "get_all"
    });
    this.restService.getCountries(stirngy).subscribe(data => {
      this.loaderShow = false;
      this.getResponse = data;
      console.log(JSON.parse(this.getResponse._body));
      this.getAllCountries = JSON.parse(this.getResponse._body).countries;
      this.getAllCities = JSON.parse(this.getResponse._body).cities;
      this.country_logo_path = JSON.parse(this.getResponse._body).country_logo_path;
      // console.log(this.getAllCities);
      // console.log(this.getAllCountries);
      // console.log(this.country_logo_path);
      // this.breakcountryPath1 = this.country_logo_path.split('country_logo_name_here')[0];
      // this.breakcountryPath2 = this.country_logo_path.split('country_logo_name_here')[1];
      // console.log(this.breakcountryPath1);
      // console.log(this.breakcountryPath2);
    } , err => {
      this.loaderShow = false;
      console.log(err);
    });
  }
  openCity(val: any , i){
    console.log(val.country_name , i);
    var index = i;
    
    /*if(val == 'pak'){
      if(this.showPakCities){
        this.showPakCities = false;
      }else{
        this.showPakCities = true;
      }
    }*/
    if(this.selectedIndex == i){
      this.selectedIndex = -1;
    }else{
      this.selectedIndex = i;
    }
  }
  chooseCity(val){
    //this.loaderShow = true;
    console.log(val);
    this.loaderShow = true;
    this.userId = firebase.auth().currentUser.uid;
    var stringy = JSON.stringify({
      userId: this.userId,
      cityId: val.system_cities_id
    });
    
   this.restService.updateProfile(stringy).subscribe(data => {
    this.loaderShow = false;
    //this.location.back();
    this.navCtrl.navigateBack('/tabs/home');
    this.toastCtrl.presentToastMessage('Your choosen city is successfully updated!');
    console.log(data);
   } , err => {
    this.loaderShow = false;
    console.log(err);
    this.alertCtrl.presentAlertService('Some network error occurred!');
   });
    // set a key/value
    
   
    /*var stringy = JSON.stringify({
      userId: this.userId
    });
    this.restService.setCountry(stringy).subscribe(data => {
      console.log(JSON.parse(data['_body']));
      this.loaderShow = false;
      this.router.navigate(['/tabs/home']);
      this.toastCtrl.presentToastMessage('Your choosen city is successfully updated!');
    } , err => {
      this.loaderShow = false;
      this.alertCtrl.presentAlertService('Some network error occurred!');
    });*/
  }
  openSideMenu(){
    this.menuCtrl.toggle();
  }
  isSearch: boolean = false;
  showSearchBar: boolean = false;
  getAllCities1: any;
  getAllCountries1: any;
  searchChanged(ev: any){
    // for chocolates
    // this.restService();
    this.isSearch = true;
    this.getAllCountries1 = this.getAllCountries;
    this.getAllCities1 = this.getAllCities;
    console.log(ev.target.value);
   
     let serVal = ev.target.value;
     if (serVal && serVal.trim() != '') {
       for(let i=0; i<this.getAllCountries1.length; i++){
       this.getAllCountries1 = this.getAllCountries1.filter((products: {countries_id : string, country_name: string , flag:string , phonecode:string ,
        sortname:string , status:string }) => {
         return (products.country_name.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
         });
         console.log(this.getAllCountries1);
       }
   }
  }
  searchLocation(){
    if(this.showSearchBar){
      this.showSearchBar = false;
    }else{
      this.showSearchBar = true;
    }
  }
  onCancel(val){

  }
}
