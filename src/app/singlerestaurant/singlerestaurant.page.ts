import { Component, OnInit ,ViewEncapsulation  } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { RestService } from '../rest.service';
import { AlerterrorService } from '../alerterror.service';
import * as firebase from 'firebase';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, Platform, NavController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ToasterService } from '../toaster.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Location } from '@angular/common';
declare var google;
@Component({
  selector: 'app-singlerestaurant',
  templateUrl: './singlerestaurant.page.html',
  styleUrls: ['./singlerestaurant.page.scss'],
  styles: ['.bigStars {height: 50px}'],
  encapsulation: ViewEncapsulation.None,
})
export class SinglerestaurantPage implements OnInit {

  restaurantId: any;
  loaderShow: boolean = false;
  restaurantDetail: any;
  discounts: any;
  restaurantImageUrl: any;
  deals: any;
  dealsArray: { id: string, name: string, oldvalue: string, newValue: string }[]=[];
  dealsObj: { id: string, name: string, oldvalue: string, newValue: string };
  map:any;

  showMap: boolean = false;

  distanceCalArray: Array<any>=[];
  distanceArr: Array<any>=[];

  distanceObj = {
    restaurantId: '',
    distance: ''
 };
 
 openingHours: any;
 aboutText: any;
 
 mydate: any;
 personCount: any;

 myDate: any;
 pet: any;
 favorites: any;
 favRestaurant: boolean = false;

 date: string = '';
 today: any;
 dateTill: any;
 discountRate: string = '';
 displayableDiscount: any;
 
arrayPersons: { id: number, valuePresent: string ,value: string }[] = [
  { "id": 0, "valuePresent": "1 Person" , "value": "1" },
  { "id": 1, "valuePresent": "2 Persons" , "value": "2" },
  { "id": 2, "valuePresent": "3 Persons" , "value": "3" },
  { "id": 3, "valuePresent": "4 Persons" , "value": "4" },
  { "id": 4, "valuePresent": "5 Persons" , "value": "5" },
  { "id": 5, "valuePresent": "6 Persons" , "value": "6" },
  { "id": 6, "valuePresent": "7 Persons" , "value": "7" },
  { "id": 7, "valuePresent": "8 Persons" , "value": "8" },
  { "id": 8, "valuePresent": "9 Persons" , "value": "9" },
  { "id": 9, "valuePresent": "10 Persons" , "value": "10" },
  { "id": 10, "valuePresent": "11 Persons" , "value": "11" },
  { "id": 11, "valuePresent": "12 Persons" , "value": "12" },
  { "id": 12, "valuePresent": "13 Persons" , "value": "13" },
  { "id": 13, "valuePresent": "14 Persons" , "value": "14" },
  { "id": 14, "valuePresent": "15 Persons" , "value": "15" },
  { "id": 15, "valuePresent": "16 Persons" , "value": "16" },
  { "id": 16, "valuePresent": "17 Persons" , "value": "17" },
  { "id": 17, "valuePresent": "18 Persons" , "value": "18" },
  { "id": 18, "valuePresent": "19 Persons" , "value": "19" },
  { "id": 19, "valuePresent": "20 Persons" , "value": "20" },
];

  rating_average: any;

  fiveStarCount: number = 0;
  fourStarCount: number = 0;
  threeStarCount: number = 0;
  twoStarCount: number = 0;
  oneStarCount: number = 0;

  ratingCount: any;
  
  constructor(public router: Router,
    public route: ActivatedRoute,
    public modalCtrl: ModalController,
    public platform: Platform,
    public geolocation: Geolocation,
    public navCtrl: NavController,
    public restService: RestService,
    public toastService: ToasterService,
    public alertService: AlerterrorService,
    private socialShare: SocialSharing,
    public location: Location,
    public datePicker: DatePicker) {
      

     this.pet = 'Menu';
      let disabledDates: Date[] = [
            new Date(1545911005644),     
            new Date(),     
            new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.     
            new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format     
            new Date('12-14-2018'), // Short format
      ];
      let datePickerObj = {
        inputDate: new Date('2018-08-10'), // default new Date()
        fromDate: new Date('2016-12-08'), // default null
        toDate: new Date('2018-12-28'), // default null
        showTodayButton: false, // default true
        closeOnSelect: true, // default false
        disableWeekDays: [4], // default []
        mondayFirst: true, // default false
        setLabel: 'S',  // default 'Set'
        todayLabel: 'T', // default 'Today'
        closeLabel: 'C', // default 'Close'
        disabledDates: disabledDates, // default []
        titleLabel: 'Select a Date', // default null
        monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        dateFormat: 'YYYY-MM-DD' ,// default DD MMM YYYY
        clearButton : false , // default true
        momentLocale: 'pt-BR', // Default 'en-US'
        yearInAscending: true, // Default false
        btnCloseSetInReverse: true, // Default false
        btnProperties: {
          expand: 'block', // Default 'block'
          fill: '', // Default 'solid'
          size: '', // Default 'default'
          disabled: '', // Default false
          strong: '', // Default false
          color: '' // Default ''
        },
        arrowNextPrev: {
          nextArrowSrc: 'assets/images/arrow_right.svg',
          prevArrowSrc: 'assets/images/arrow_left.svg'
        }, // This object supports only SVG files.
        highlightedDates: [
         { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
         { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
        ] ,// Default [],
        isSundayHighlighted : {
         fontColor: '#ee88bf' // Default null
        } // Default {}
      }
  }
  maxDate: any;

  ionViewWillEnter(){
    this.dealsArray = [];
    console.log(new Date().getDate());
    console.log(new Date().getMonth());
    console.log(new Date().getFullYear());
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    this.maxDate = year.toString()+'-'+month.toString()+'-'+date.toString();
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
    this.addInfoWindow(marker, mapsResponse.name , mapsResponse.restaurants_id);
  }

  addInfoWindow(marker, content , id) {
    const infoWindow = new google.maps.InfoWindow({
      content
    });
    google.maps.event.addListener(marker, 'click', () => {
      //infoWindow.open(this.map, marker);
      console.log(id);
      
      //this.router.navigate(['/singlerestaurant'] );
    });
  }
  goToRestaurantDetails(){
    if(firebase.auth().currentUser){
      if(this.personCount != null && this.personCount != ''){
      if(this.discountArray.length > 0){
       
           if(this.date){
            let navigationExtras: NavigationExtras = {
              queryParams:{
                id: this.restaurantId,
                discountId: this.discountArray[0].discounts_id,
                discount_rate: this.discountArray[0].discount_rate,
                start_time: this.discountArray[0].start_time,
                end_time: this.discountArray[0].end_time,
                end_date: this.discountArray[0].end_date,
                type: this.discountArray[0].type,
                persons: this.personCount,
                reservationDate: this.date
              }
            }
            this.navCtrl.navigateForward(['/reservenew'] , navigationExtras);
          }else {
            this.toastService.presentToastMessage('Please choose reservation date!');
          }
       
        
      }
      else {
       this.toastService.presentToastMessage('Please choose your discount!');
      if(this.date){
      
          let navigationExtras: NavigationExtras = {
            queryParams:{
              id: this.restaurantId,
              discountId: '',
              discount_rate: '',
              start_time: '',
              end_time: '',
              end_date: '',
              type: '',
              persons: this.personCount,
              reservationDate: this.date
            }
          }
          console.log(this.personCount);
          this.navCtrl.navigateForward(['/reservenew'] , navigationExtras);
        }else {
          this.toastService.presentToastMessage('Please choose reservation date!');
        }
      }
    }else {
      this.toastService.presentToastMessage('Please choose persons count!');
    }
    }else{
      this.toastService.presentToastMessage('Please login or create an account first!');
    }
   
  }
  //bottom tabs
  getAllMenu(){
    this.showMap = false;
  }
  getAbout(){
    this.showMap = true;
    var stringify = JSON.stringify({
      requestType: 'about',
      restaurantId: this.restaurantId
    });
    this.restService.getAboutSection(stringify).subscribe(response => {
      console.log(JSON.parse(response['_body']));
      this.openingHours = JSON.parse(response['_body']).operating_hours;
      this.aboutText = JSON.parse(response['_body']).about[0]; 
      this.about = this.aboutText.about;
      this.atmosphere = this.aboutText.atmosphere;
      this.services = this.aboutText.services;
      this.payment_options = this.aboutText.payment_options;

    } , err => { 
      this.alertService.presentAlertService('Error in sending request');
    });
  }
  getReviews(){
    this.showMap = false;
    var stringy = JSON.stringify({
      requestType: 'reviews',
      restaurantId: this.restaurantId
    });
    this.restService.getReviewSection(stringy).subscribe(response => {
      console.log(JSON.parse(response['_body']));
      this.reviews = JSON.parse(response['_body']).reviews;
      this.reviewsCount = this.reviews.length;
      for(let i = 0; i < this.reviews.length; i++){
        if(this.reviews[i].rating_stars == '5'){
          this.fiveStarCount ++;
          console.log(this.fiveStarCount);
        }else if(this.reviews[i].rating_stars == '4'){
          this.fourStarCount ++;
          console.log(this.fourStarCount);
        }else if(this.reviews[i].rating_stars == '3'){
          this.threeStarCount ++;
          console.log(this.threeStarCount);
        }else if(this.reviews[i].rating_stars == '2'){
          this.twoStarCount ++;
        }else if(this.reviews[i].rating_stars == '1'){
          this.oneStarCount ++;
        }else{
          //nothing
        }
      }
    } , err => {
      this.alertService.presentAlertService('Network error occured');
    });
  }
  ngOnInit() {
    
    this.route.queryParams.subscribe(data =>{
      this.distanceCalArray = [];
      this.distanceArr = [];
      this.showMap = false;
    console.log('hello');
      this.restaurantId = data.id;
     console.log(data);
      this.loaderShow = true;
     /**/
      var stringy = JSON.stringify({
        requestType: 'all_by_id',
        restaurantId: this.restaurantId 
      });
      this.restService.getSingleRestaurantDetails(stringy).subscribe(data => {
      
         // calling api to check the fav restaurants
         if(firebase.auth().currentUser){
          this.userId = firebase.auth().currentUser.uid;
          var fav=JSON.stringify({
            requestType: 'get_fav',
            userID: this.userId
          });
          this.restService.favouriteRestaurant(fav).subscribe(response => {
            console.log(JSON.parse(response['_body']));
            this.favorites = JSON.parse(response['_body']).fav_restaurants;
            //call firebase to get the reservation owner data
            if(this.favorites.length > 0){
              for(let i = 0; i < this.favorites.length; i++){
                if(this.restaurantId == this.favorites[i].restaurant_id){
                  this.favRestaurant = true;
                }else{
                  this.favRestaurant = false;
                }
              }
            }else {
  
            }
          });
        }else {
          //this.toastService.presentToastMessage('Please login or create an account first')
        }

        this.loaderShow = false;
        console.log(JSON.parse(data['_body']));
        this.restaurantDetail = JSON.parse(data['_body']).restaurant_data;
        this.deals = JSON.parse(data['_body']).deals;
        this.discounts = JSON.parse(data['_body']).discounts;
        
        this.ratingCount = this.restaurantDetail[0].rating_count,

        this.restaurantImageUrl = JSON.parse(data['_body']).restaurants_img_url;
       // this.openingHours = JSON.parse(data['_body']).operating_hours;
        for(let i = 0; i < this.restaurantDetail.length; i++){
          if(this.restaurantId == this.restaurantDetail[i].restaurants_id){
            console.log(this.restaurantDetail[i]);
            this.displayGoogleMap(this.restaurantDetail[i]);
          }else {
            console.log('No match');
          }
        }
        console.log(this.restaurantDetail.length);
        //getting the distance in km's
        for(let i = 0; i < this.restaurantDetail.length; i++){
          this.distanceCalArray.push(this.restaurantDetail[i]);
        }
        this.geolocation.getCurrentPosition().then((res) => {
          // resp.coords.latitude
          // resp.coords.longitude
          //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
          let location = 'lat '+res.coords.latitude+' lang '+res.coords.longitude;
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
          this.rating_average = this.distanceCalArray[i].rating_average;
          console.log(this.rating_average);
          }
          console.log((this.distanceArr));
          //adding recently view restaurants
          if(firebase.auth().currentUser){
            this.userId = firebase.auth().currentUser.uid;
            /*firebase.database().ref('recentlyView/'+this.userId)
            .update({
              id: this.restaurantDetail[0].restaurants_id,
              ratingSum: this.restaurantDetail[0].rating_sum,
              ratingAvg: this.restaurantDetail[0].rating_average,
              ratingCount: this.restaurantDetail[0].rating_count,
              name: this.restaurantDetail[0].name,
              restaurantImage: this.restaurantDetail[0].restaurant_image,
              location: this.restaurantDetail[0].location,
              city: this.restaurantDetail[0].city,
              distance: this.distanceArr[0].distance,
              restaurantImageUrl: this.restaurantImageUrl,
            });*/
            var stringy = JSON.stringify({
              userID: this.userId,
              requestType: 'add',
              restaurantId: this.restaurantId
            });
            this.restService.recentRestaurant(stringy).subscribe(response => {
              console.log((response['_body']));
            } , err => {
              console.log(err);
            });
          }
        }).catch((error) => {
          console.log('Error getting location', error);
        });
        
      },err => {
        this.loaderShow = false;
        this.alertService.presentAlertService(err);
      });
      //});
    });
  }
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
  //choosing discount
  selectedDiscount: number;
  selectDiscount(discount , i){
    console.log(discount);
    this.dealsArray = [];
    if(firebase.auth().currentUser){
      this.discountArray = [];
      this.discountRate = discount.discount_rate;
      this.discountArray.push(discount);
      this.selectedDiscount = i;
      for(let i = 0; i < this.deals.length; i++){
        this.dealsObj = {
          id: '',
          name: '',
          oldvalue: '',
          newValue: '',
       };
       
       console.log(this.selectDiscount);
       this.displayableDiscount = discount.discount_rate;
        var number = parseInt(discount.discount_rate) * parseInt(this.deals[i].old_price)/100;
        number = this.deals[i].old_price - number;
        this.dealsObj.id = this.deals[i].discounts_id;
        this.dealsObj.name = this.deals[i].deal_name;
       this.dealsObj.oldvalue = this.deals[i].old_price;
       this.dealsObj.newValue = number.toString();
       this.dealsArray.push(this.dealsObj);
      }
      console.log(this.dealsArray);
      this.toastService.presentToastMessage('Choosed discount of '+discount.discount_rate+'%');
      console.log(this.discountArray);
    }else{
      this.toastService.presentToastMessage('Please login or create an account first!');
    }
  }

  //rating change
  onRateChange(event){
    console.log(event);
   // this.starVal = event;
  }
  starVal: number = 0;

  //submit review
  submitReview(){
    if(firebase.auth().currentUser){
      this.userId = firebase.auth().currentUser.uid;
      if(this.reviewValue.length > 10){
        var stringy = JSON.stringify({
          requestType: 'by_user',
          restaurantId: this.restaurantId,
          userID: this.userId,
          feedback: this.reviewValue,
          ratingStars: this.starVal.toString()
        });
        this.reviewValue = '';
        this.restService.sendReviewSection(stringy).subscribe(response => {
          console.log(JSON.parse(response['_body']));
          this.reviews = JSON.parse(response['_body']).reviews;
          this.reviewsCount = this.reviews.length;
        } , err => {
          this.alertService.presentAlertService('Network error occured in sending review');
        });
      }else {
        this.alertService.presentAlertService('Please enter atleast 10 characters for submitting review!')
      }
    }else {
      this.toastService.presentToastMessage('Please login or create an accont first!');
    }
  }
  datePickerObj: any = {};
  selectedDate;
  myFunction(){
    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD'
    };
    this.openDatePicker();
  }
  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
         'objConfig': this.datePickerObj, 
         'selectedDate': this.selectedDate 
      }
    });
    await datePickerModal.present();
 
    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.selectedDate = data.data.date;
      });
  }

  userId: string = '';

about: any;
services: any;
atmosphere: any;
payment_options: any;
reviews: any;
reviewsCount: any;
reviewValue: string = '';
discountArray: Array<any> = [];

  // add restaurant to Favourite
  addToFavourite(){
    if(firebase.auth().currentUser){
      this.userId = firebase.auth().currentUser.uid;
      var stringy = JSON.stringify({
        requestType: 'add_fav',
        userID: this.userId,
        restaurantId: this.restaurantId
      });
      console.log(this.userId + ' ' + 'login with fb');
      this.loaderShow = true;
      this.favRestaurant = true;
      this.restService.favouriteRestaurant(stringy).subscribe(data => {
        this.loaderShow = false;
        console.log(JSON.parse(data['_body']));
        if(JSON.parse(data['_body']).status == 'success'){
          this.toastService.presentToastMessage('Added to favourites successfully');
        }else {
          this.toastService.presentToastMessage('Already added to favourites');
        }
      } , err => {
        this.alertService.presentAlertService('Some network error occurs!');
      });
    }else{
      this.toastService.presentToastMessage('Please login or create an account first!');
    }
  }
 
  pickDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      allowOldDates: false,
      minDate: this.platform.is('ios') ? new Date() : new Date().valueOf()
      
    }).then(
      date => {
        console.log('Got date: ', date);

        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var dateToday =  day + ' ' + monthNames[monthIndex] + ' ' + year;
        
        this.date = dateToday.toString();
      }
      ,
      err => console.log('Error occurred while getting date: ', err)
    );
  }
 

  openDiv(){
    
    if(!this.showDiv){
      this.showDiv = true;
    }else {
      this.showDiv = false;
    }
    
  }
  getPersons(value){
    this.showDiv = false;
    this.personCount = value.value;
    console.log(this.personCount);
    this.toastService.presentToastMessage(value.valuePresent+' choosed');
  }
  showDiv: boolean = false;
  
  hello: any = `<p text-center>
  <img style="height: 50px" class="bigStars" src="https://via.placeholder.com/300.png/09f/fff"
  </p>`;

  arrayHere: { id: number, valuePresent: string ,value: string }[] = [
    { "id": 0, "valuePresent": `<p text-center>
    <img style="height: 50px" class="bigStars" src="https://via.placeholder.com/300.png/09f/fff"
    </p>` , "value": "1" },
    { "id": 0, "valuePresent": `<p text-center>
    <img style="height: 50px" class="bigStars" src="https://via.placeholder.com/300.png/09f/fff"
    </p>` , "value": "1" },
    { "id": 0, "valuePresent": `<p text-center>
    <img style="height: 50px" class="bigStars" src="https://via.placeholder.com/300.png/09f/fff"
    </p>` , "value": "1" },
    { "id": 0, "valuePresent": `<p text-center>
    <img style="height: 50px" class="bigStars" src="https://via.placeholder.com/300.png/09f/fff"
    </p>` , "value": "1" }
  ];

  grayStar(val){
    console.log(val);
    this.starVal = val;
    if(val == 1){
      this.grayStarOne = false;
      this.grayStarTwo = true;
      this.grayStarThree = true;
      this.grayStarFour = true;
      this.grayStarFive = true;

      this.redStarOne = true;
      this.redStarTwo = false;
      this.redStarThree = false;
      this.redStarFour = false;
      this.redStarFive = false;
    }else if(val == 2){
      this.grayStarOne = false;
      this.grayStarTwo = false;
      this.grayStarThree = true;
      this.grayStarFour = true;
      this.grayStarFive = true;

      this.redStarOne = true;
      this.redStarTwo = true;
      this.redStarThree = false;
      this.redStarFour = false;
      this.redStarFive = false;
    }else if(val == 3){
      this.grayStarOne = false;
      this.grayStarTwo = false;
      this.grayStarThree = false;
      this.grayStarFour = true;
      this.grayStarFive = true;

      this.redStarOne = true;
      this.redStarTwo = true;
      this.redStarThree = true;
      this.redStarFour = false;
      this.redStarFive = false;
    }else if(val == 4){
      this.grayStarOne = false;
      this.grayStarTwo = false;
      this.grayStarThree = false;
      this.grayStarFour = false;
      this.grayStarFive = true;

      this.redStarOne = true;
      this.redStarTwo = true;
      this.redStarThree = true;
      this.redStarFour = true;
      this.redStarFive = false;
    }else{
      this.grayStarOne = false;
      this.grayStarTwo = false;
      this.grayStarThree = false;
      this.grayStarFour = false;
      this.grayStarFive = false;

      this.redStarOne = true;
      this.redStarTwo = true;
      this.redStarThree = true;
      this.redStarFour = true;
      this.redStarFive = true;
    }
  }
  redStar(val){
    console.log(val);
    this.starVal = val;
    if(val == 1){
      this.grayStarOne = false;
      this.grayStarTwo = true;
      this.grayStarThree = true;
      this.grayStarFour = true;
      this.grayStarFive = true;

      this.redStarOne = true;
      this.redStarTwo = false;
      this.redStarThree = false;
      this.redStarFour = false;
      this.redStarFive = false;
    }else if(val == 2){
      this.grayStarOne = false;
      this.grayStarTwo = false;
      this.grayStarThree = true;
      this.grayStarFour = true;
      this.grayStarFive = true;

      this.redStarOne = true;
      this.redStarTwo = true;
      this.redStarThree = false;
      this.redStarFour = false;
      this.redStarFive = false;
    }else if(val == 3){
      this.grayStarOne = false;
      this.grayStarTwo = false;
      this.grayStarThree = false;
      this.grayStarFour = true;
      this.grayStarFive = true;

      this.redStarOne = true;
      this.redStarTwo = true;
      this.redStarThree = true;
      this.redStarFour = false;
      this.redStarFive = false;
    }else if(val == 4){
      this.grayStarOne = false;
      this.grayStarTwo = false;
      this.grayStarThree = false;
      this.grayStarFour = false;
      this.grayStarFive = true;

      this.redStarOne = true;
      this.redStarTwo = true;
      this.redStarThree = true;
      this.redStarFour = true;
      this.redStarFive = false;
    }else{
      this.grayStarOne = false;
      this.grayStarTwo = false;
      this.grayStarThree = false;
      this.grayStarFour = false;
      this.grayStarFive = false;

      this.redStarOne = true;
      this.redStarTwo = true;
      this.redStarThree = true;
      this.redStarFour = true;
      this.redStarFive = true;
    }
  }
  grayStarOne: boolean = true;
  grayStarTwo: boolean = true;
  grayStarThree: boolean = true;
  grayStarFour: boolean = true;
  grayStarFive: boolean = true;

  redStarOne: boolean = false;
  redStarTwo: boolean = false;
  redStarThree: boolean = false;
  redStarFour: boolean = false;
  redStarFive: boolean = false;

  goBack(){
    this.location.back();
  }
  IOS:any='';
  ANDRIOD:any='';
  shareClick(){
    if (this.platform.is('cordova')) {
      var url = '';
      if (this.platform.is('android')){
  
      // url = this.ANDRIOD+userid;
       
      var options = {
      message: this.restaurantDetail[0].location + ' ' + this.restaurantDetail[0].name + ' Rating: ' + this.restaurantDetail[0].rating_count,
      subject: 'Rating: ' + this.restaurantDetail[0].rating_count,
      files: ['', ''],
      url: url,
      chooserTitle: this.restaurantDetail[0].name
      }
      this.socialShare.shareWithOptions(options);
    }
  
    else if(this.platform.is('ios')){
      
      // url = this.IOS+userid;
      var options = {
        message: this.restaurantDetail[0].location + ' ' + this.restaurantDetail[0].name + ' Rating: ' + this.restaurantDetail[0].rating_count,
        subject: 'Rating: ' + this.restaurantDetail[0].rating_count,
        files: ['', ''],
        url: url,
        chooserTitle: this.restaurantDetail[0].name
        }
      this.socialShare.shareWithOptions(options);
      
    }
  }else{
    console.log('cordodva not available');
  }
  }
}
