import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseauthService } from '../firebaseauth.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RestService } from '../rest.service';
import { AlerterrorService } from '../alerterror.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToasterService } from '../toaster.service';

import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, PopoverController, NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { CountriespopoverPage } from '../countriespopover/countriespopover.page';

@Component({
  selector: 'app-reservenew',
  templateUrl: './reservenew.page.html',
  styleUrls: ['./reservenew.page.scss'],
})
export class ReservenewPage implements OnInit {

  userId: string = '';
  name: string = '';
  email: string = '';
  number: string = '';

  restaurantId: any;
  loaderShow: boolean = false;
  restaurantDetail: any;
  discounts: any;
  restaurantImageUrl: any;
  restaurantImage: any;
  
  deals: any;
  map:any;

  showMap: boolean = false;

  distanceCalArray: Array<any>=[];
  distanceArr: Array<any>=[];

  distanceObj = {
    restaurantId: '',
    distance: ''
 };
 discount: any;
 personsCount: any;
 reservationDate: any;

 scannedData: any;
 encodedData = '';
 
 end_date: any;
 type: any;
 location: any;
 restName: any;

 termsConditions: any;
 privacyPolicy: any;

 phoneCode = '+92';
 countryName: any;
 countryFlag = 'flag';
  constructor(public firebase: FirebaseauthService,
    public router: Router,
    public route: ActivatedRoute,
    public barcodeCtrl: BarcodeScanner,
    public geolocation: Geolocation,
    public restService: RestService,
    public toastService: ToasterService,
    public alertService: AlerterrorService,
    public alertController: AlertController,
    public locationHere: Location,
    public navCtrl: NavController,
    public barcodeScanner: BarcodeScanner,
    public popoverCtrl: PopoverController
    ) { }

  ngOnInit() {
    console.log('ionViewDidLoad ProfilePage');
    //check if user is already logged in
    this.loaderShow = true;
    this.userId = firebase.auth().currentUser.uid;
    console.log(firebase.auth().currentUser);
    if(firebase.auth().currentUser){
      if (firebase.auth().currentUser.providerData[0].providerId == 'password') {
        console.log('login with normal');
        //this.showPasswordInput = true;
      }else if(firebase.auth().currentUser.providerData[0].providerId == 'facebook.com'){
        console.log('login with Facebook');
        //this.showPasswordInput = false;
      }
    }
    //this.loader.presentLoader();
   // this.loaderShow = true;
    this.firebase.getProfileData(this.userId).once("value" , snapshot => {
      //this.loader.hideLoader();
      //this.loaderShow = false;
      if(snapshot.val()){
        this.name = snapshot.val().name;
        this.email = snapshot.val().email;
        //making a check to avoid undefined value
        if(snapshot.val().number){
          this.number = snapshot.val().number;
        }else {
          this.number = '';
        }
        this.loaderShow = false;
      }else {
        this.loaderShow = false;
        console.log('No data');
      }
    }).catch(err => {
      //this.loaderShow = false;
        //this.alertError.presentAlertAuth(err);
    });
  }
  longitude: any;
  latitude: any;

  ionViewWillEnter(){
    this.showMap = false;
    this.route.queryParams.subscribe(data =>{
      console.log(data);
      this.restaurantId = data.id;
      this.discountId = data.discountId;
      this.discount_rate = data.discount_rate,
      this.start_time = data.start_time,
      this.end_time = data.end_time,
      this.personsCount = data.persons,
      this.end_date = data.end_date,
      this.type = data.type,
      this.reservationDate = data.reservationDate
      console.log(this.personsCount);
      var stringy = JSON.stringify({
        requestType: 'all_by_id',
        restaurantId: this.restaurantId 
      });
      this.loaderShow = true;
      this.restService.getSingleRestaurantDetails(stringy).subscribe(data => {
        this.loaderShow = false;
        console.log(JSON.parse(data['_body']));
        this.restaurantDetail = JSON.parse(data['_body']).restaurant_data[0];
        this.latitude = this.restaurantDetail.latitude;
        this.longitude = this.restaurantDetail.longitude;
        this.location = JSON.parse(data['_body']).restaurant_data[0].location;
        this.restName = JSON.parse(data['_body']).restaurant_data[0].name;
        this.privacyPolicy = JSON.parse(data['_body']).privacy_policy;
        this.termsConditions = JSON.parse(data['_body']).restaurant_data[0].terms_conditions;
        this.deals = JSON.parse(data['_body']).deals;
        this.discounts = JSON.parse(data['_body']).discounts;
        this.restaurantImageUrl = JSON.parse(data['_body']).restaurants_img_url;
        this.restaurantImage = JSON.parse(data['_body']).restaurant_data[0].restaurant_image;
       // this.openingHours = JSON.parse(data['_body']).operating_hours;
        for(let i = 0; i < this.restaurantDetail.length; i++){
          if(this.restaurantId == this.restaurantDetail[i].restaurants_id){
            console.log(this.restaurantDetail[i]);
            //this.displayGoogleMap(this.restaurantDetail[i]);
          }else {
            console.log('No match');
          }
        }
        //getting the distance in km's
        for(let i = 0; i < this.restaurantDetail.length; i++){
          this.distanceCalArray.push(this.restaurantDetail[i]);
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
        
      },err => {
        this.loaderShow = false;
        this.alertService.presentAlertService(err);
      });
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
  //confirming reservation
  confirmReservation(){
    if(this.personName == ''){
      this.validationName = true;
    } 
    if(this.phoneNumber == ''){
      this.validationMobile = true;
    }
    if(this.keyupNameBool == true){
      this.keyupNameBool = true;
    } 
    if(this.personName.length > 12){
    this.characterLengthNameBool = true;
    }
      //   // check the condition for email
    if(this.email == ''){
      this.validationEmail = true;
    } 
    if(this.keyupEmailBool == true){
     this.keyupEmailBool = true;
    } 
    //   //finalizing the request
    console.log(this.validationName , this.validationMobile,
      this.keyupNameBool,this.characterLengthNameBool,this.validationEmail,
      this.keyupEmailBool
      )
    if(this.characterLengthNameBool == false &&
    this.keyupNameBool == false &&
    this.validationName == false &&
    this.keyupEmailBool == false &&
   
    this.validationMobile == false
    ){
      console.log('cleared');
    
     console.log(new Date());
      var stringy = JSON.stringify({
        requestType: 'add_new',
        restaurantId: this.restaurantId,
        userID: this.userId,
        number_of_users: this.personsCount,
        reservation_date: this.reservationDate,
        discount_id: this.discountId,
        email: this.email,
        phone: this.phoneNumber,
        name: this.personName
      });
      this.loaderShow = true;
      this.restService.confirmReservationForUser(stringy).subscribe(response => {
        this.loaderShow = false;
        console.log(JSON.parse(response['_body']));
        if(JSON.parse(response['_body']).status == 'error'){
          this.toastService.presentToastMessage('Some problem occurred in reserving restaurant!');
        }else{
          this.toastService.presentToastMessageConfirm('Congratulations! Your reservation is confirmed!Please scan the Qr code when you reach the restaurant');
          let navigationExtras: NavigationExtras = {
            queryParams:{
              id: this.restaurantId,
              discountId: this.discountId,
              discount_rate: this.discount_rate,
              start_time: this.start_time,
              end_time: this.end_time,
              persons: this.personsCount,
              reservationDate: this.reservationDate,
              end_date: this.end_date,
              type: this.type,
              name: this.personName,
              email: this.email
            }
          }
          this.router.navigate(['/qrconfirm'] , navigationExtras);
        }
      } , err => {
        this.alertService.presentAlertService('Network error ocurred in reservation!');
      });
    }else{
      console.log('problem');
    }
  }

  //discounts vars
  discountId: string = '';
  end_time: any;
  start_time: any;
  discount_rate: any;

  goToBarcodeScan() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'QR_CODE,PDF_417 ',
      orientation: 'landscape',
    };

    this.barcodeCtrl.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;

    }).catch(err => {
      console.log('Error', err);
    });
  }
  qrData = 'https:ionicacademy.com';
  scannedCode = null;
  elemenyType : 'url' | 'canvas' | 'img' = 'canvas';
 
  scanCode(){
    this.barcodeScanner.scan().then(
      barcodeData =>{
        this.scannedCode = barcodeData.text;	
        this.toastService.presentToastMessage('Successfully scanned the code!');
      }
    );
  }
  downloadQR(){
    
  }
  goToReservationDetail(){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        id: this.restaurantId
      }
    }
    this.router.navigate(['/singlerestaurant'] , navigationExtras)
  }
  //open privacy policy
  async handleButtonClickPolicy() {
    const alert = await this.alertController.create({
      header: 'Privacy policy',
      message: this.privacyPolicy,
      buttons: ['Ok']
    });

    await alert.present();
  }
   //open terms and conditions
   async handleButtonClickConditions() {
    const alert = await this.alertController.create({
      header: 'Terms and conditions',
      message: this.termsConditions,
      buttons: ['Ok']
    });

    await alert.present();
    
  }
  goToHome(){
    this.locationHere.back();
  } 
  openRestaurantLocation(){
    let navigationExtras: NavigationExtras = {
      queryParams:{
        latitude: this.latitude,
        longitude: this.longitude,
        name: this.restName,
        image: this.restaurantImageUrl + this.restaurantImage
      }
    }
    this.router.navigate(['/restaurantlocation'] , navigationExtras);
  }
  async presentPopover() {
    const modal = await this.popoverCtrl.create({
      component: CountriespopoverPage,
      //componentProps:  value,
      animated: false
    //  componentProps: this.workoutGoals
  });
    modal.onWillDismiss().then(data => {
      console.log(data.data.value);
      this.countryFlag = data.data.value.flag;
      this.countryName = data.data.value.name;
      this.phoneCode = data.data.value.code;
    })
    return await modal.present();
  }


    //name var
    personName: string = '';
    characterLengthNameBool: any;//: boolean = false
    keyupNameBool: any;
    colorNameBool: any;
    validationName: any;
    //email var
    //characterLengthEmailBool: any;
    keyupEmailBool: any;
    colorEmailBool: any;
    validationEmail: any;

    phoneNumber: string = '';
    validationMobile: boolean = false;
    keyupNumberBool: boolean = false;
    characterLengthNumberBool: boolean = false;
    colorMobileBool: boolean = false;
  nameKeyUp(){
    var regex = new RegExp(/^[A-Za-z ]+$/);
    var regexdob = new RegExp("^(?!.*[\%\/\\\&\?\,\'\;\:\!\-]{2}).*$");
    if (regex.test(this.personName) && regexdob.test(this.personName)) {
      if(this.personName.length <= 12){
        this.characterLengthNameBool = false;
      }else {
        this.characterLengthNameBool = true;
      }
      this.keyupNameBool = false;
    }else {
      this.keyupNameBool = true;
    }
  }
  checkFocusName(){
    this.colorNameBool = true;
  }
  checkBlurName(){
    this.colorNameBool = false;
    if(this.personName != ''){
      this.validationName = false;
    }else {
      this.validationName = true;
    }
  }
   //email valid
   emailKeyUp(){
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regexdob = new RegExp("^(?!.*[\%\/\\\&\?\,\'\;\:\!\-]{2}).*$");
    if (expression.test(this.email) && regexdob.test(this.email)) {
      /*if(this.email.length <= 25){
        this.characterLengthEmailBool = false;
      }else {
        this.characterLengthEmailBool = true;
      }*/
      this.keyupEmailBool = false;
    }else {
      console.log('Invalid');
      this.keyupEmailBool = true;
    }
  }
  checkFocusEmail(){
    this.colorEmailBool = true;
  }
  checkBlurEmail(){
    this.colorEmailBool = false;
    if(this.email != ''){
      this.validationEmail = false;
    }else {
      this.validationEmail = true;
    }
    if(this.email != '' && !this.validationEmail && !this.keyupEmailBool){
      //check the email from server that if that email exists or not
     // this.checkEmailRequest(this.email);
    }
  }
  checkFocusMobile(){
    this.colorMobileBool = true;
  }
  checkBlurMobile(){
    this.colorMobileBool = false;
    if(this.phoneNumber != ''){
      this.validationMobile = false;
    }else {
      this.validationMobile = true;
    }
  }
  contactUs(){
    let navigationExtras: NavigationExtras = {
      queryParams:{
       restaurantId: this.restaurantId
      }
    }
    this.navCtrl.navigateForward(['/restaurantcontactus'] , navigationExtras)
  }
  goToTerms(){
    this.navCtrl.navigateForward(['/term']);
  }
  goToPolicy(){
    this.navCtrl.navigateForward(['/term']);
  }
}
