import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { FirebaseauthService } from '../firebaseauth.service';
import { Router } from '@angular/router';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { CameraimageService } from '../cameraimage.service';
import { AlerterrorService } from '../alerterror.service';
import { ToasterService } from '../toaster.service';
import { LoaderService } from '../loader.service';
import { RestService } from '../rest.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  cityName: string = '';

  userId: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  number: string = '';

  profileImage: string = '';

  showPasswordInput: boolean = false;

  //name var
  characterLengthNameBool: any;
  keyupNameBool: any;
  colorNameBool: any;
  validationName: any;
  //email var
  //characterLengthEmailBool: any;
  keyupEmailBool: any;
  colorEmailBool: any;
  validationEmail: any;
  //password var
  characterLengthPasswordBool: any;
  colorPasswordBool: any
  validationPassword: any;

  //number var
  keyupNumberBool: any;
  characterLengthNumberBool: any;
  validationMobile: any;
  
  //loader show bool
  loaderShow: boolean = false;

  userAuth: boolean = false;
  constructor(public firebase: FirebaseauthService,
    public router: Router,
    public alertCtrl: AlertController,
    public imageService: CameraimageService,
    public alertError: AlerterrorService,
    public toastService: ToasterService,
    public storage: Storage,
    //public loader: LoaderService,
    public restService: RestService) { }

    ionViewWillEnter(){
      if(firebase.auth().currentUser){
        this.userAuth = true;
        this.storage.get('country').then((val) => {
          // console.log('Your age is', val);
          this.cityName = val;
        });
      }else {
        this.userAuth = false;
      }
    }

  ngOnInit() {
    if(firebase.auth().currentUser){
      this.userAuth = true;
      console.log('ionViewDidLoad ProfilePage');
      //check if user is already logged in
      this.userId = firebase.auth().currentUser.uid;
      console.log(firebase.auth().currentUser);
      if(firebase.auth().currentUser){
        if (firebase.auth().currentUser.providerData[0].providerId == 'password') {
          console.log('login with normal');
          this.showPasswordInput = true;
        }else if(firebase.auth().currentUser.providerData[0].providerId == 'facebook.com'){
          console.log('login with Facebook');
          this.showPasswordInput = false;
        }
      }
      //this.loader.presentLoader();
      this.loaderShow = true;
      this.firebase.getProfileData(this.userId).once("value" , snapshot => {
        //this.loader.hideLoader();
        this.loaderShow = false;
        if(snapshot.val()){
          this.characterLengthNameBool = false;
          this.keyupNameBool = false;
          this.validationName = false;
          this.keyupEmailBool = false;
          this.validationEmail = false;
          this.characterLengthPasswordBool = false;
          this.validationPassword = false;
          this.validationMobile = false;
          this.keyupNumberBool = false; 
  
          this.name = snapshot.val().name;
          this.email = snapshot.val().email;
          //making a check to avoid undefined value
          if(snapshot.val().number){
            this.number = snapshot.val().number;
          }else {
            this.number = '';
          }
          if(snapshot.val().profileImage){
            this.profileImage = snapshot.val().profileImage;
          }else {
            this.profileImage = '';
          }
        }else {
          console.log('No data');
        }
      }).catch(err => {
        this.loaderShow = false;
          //this.alertError.presentAlertAuth(err);
      });
    }else {
      this.userAuth = false;
    }
    
  }
  //update data
  update(){
    //check the condition for name
    if(this.name == ''){
      this.validationName = true;
    } 
    if(this.keyupNameBool == true){
      this.keyupNameBool = true;
    } 
    if(this.name.length > 12){
      this.characterLengthNameBool = true;
    }
    // check the condition for email
    if(this.email == ''){
      this.validationEmail = true;
    } 
    if(this.keyupEmailBool == true){
      this.keyupEmailBool = true;
    } 
    /*if(this.email.length > 25){
      this.characterLengthEmailBool = true;
    }*/
    // check the condition for password
    if(this.showPasswordInput){
      if(this.password == ''){
        this.validationPassword = true;
      } 
    }
   
    // check the condition for re password
    if(this.number == ''){
      this.validationMobile = true;
    }
    if(this.keyupNumberBool == true){
      this.keyupNumberBool = true;
    }
   
    console.log(
      this.characterLengthNameBool ,
    this.keyupNameBool  ,
    this.validationName  ,
    this.keyupEmailBool  ,
    this.validationEmail  ,
    this.characterLengthPasswordBool  ,
    this.validationPassword ,
    this.validationMobile ,
    this.keyupNumberBool 
    )
    //finalizing the request
    if(this.characterLengthNameBool == false &&
    this.keyupNameBool == false &&
    this.validationName == false &&
    this.keyupEmailBool == false &&
    this.validationEmail == false &&
    this.characterLengthPasswordBool == false &&
    this.validationPassword == false &&
    this.validationMobile == false &&
    this.keyupNumberBool == false
    ){
      //updating data in firebase
      //this.loader.presentLoader();
      this.loaderShow = true;
      this.firebase.updatePasswordEmail(this.password , this.email , this.showPasswordInput).then(data => {
        this.firebase.updateProfileData(this.userId , this.name , this.email , this.number , this.profileImage).then(data => {
          //this.loader.hideLoader();
          ////check if user is logged in
          var stringy = JSON.stringify({
            userId: this.userId,
            name: this.name,
            number: this.number,
            email: this.email,
            profilePicture: this.profileImage
          });
          //updating data on server
          
          this.restService.updateUserData(stringy).subscribe(response => {
            console.log(response);
            //this.loader.hideLoader();
            this.loaderShow = false;
            this.toastService.presentToastFirebaseUpdateData();
          } , err => {
            this.loaderShow = false;
            this.alertError.presentAlertService(err);
          });
          
        }).catch(err => {
           //this.loader.hideLoader();
           this.loaderShow = false;
          this.alertError.presentAlertAuth(err);
        });
      }).catch(err => {
        //this.loader.hideLoader();
        this.loaderShow = false;
        this.alertError.presentAlertAuth(err);
      });
      
    }else {
      console.log('No');
    }
  }
   //Take profile picture
   async takeProfilePicture(){
    let alert = await this.alertCtrl.create({
      message: 'Upload profile picture?',
      buttons: [
        {
          text: 'Take a photo',
          handler: () => {
            this.takeImageFromCamera();
          }
        },
        {
          text: 'Get photo from gallery',
          handler: () => {
            this.getImageFromGallery();
          }
        }
      ]
    });
    alert.present();
  }
  takeImageFromCamera(){
    this.imageService.selectImageInCamera().then((imageData) => {
      this.profileImage = `data:image/png;base64,${imageData}`;
      console.log(this.profileImage);
    }).catch(err => console.error(err));
  }
  getImageFromGallery(){
    this.imageService.selectImageInGallery().then((imageData) => {
      this.profileImage = `data:image/png;base64,${imageData}`;
    }).catch(err => console.error(err));
  }
  //logout profile
  logout(){
    //check if user is logged in
    this.firebase.logout();
    this.name = '';
    this.password = '';
    this.email = '';
    this.number = '';
    this.toastService.presentToastFirebaseLogout();
    localStorage.clear();
    this.router.navigateByUrl('/tabs/home');
  }
  //validations of fields
  //validations of input fields
  //name
  nameKeyUp(){
    console.log('sd');
    var regex = new RegExp(/^[A-Za-z ]+$/);
    var regexdob = new RegExp("^(?!.*[\%\/\\\&\?\,\'\;\:\!\-]{2}).*$");
    if (regex.test(this.name) && regexdob.test(this.name)) {
      console.log('sd');
      if(this.name.length <= 20){
        this.characterLengthNameBool = false;
      }else {
        this.characterLengthNameBool = true;
      }
      this.keyupNameBool = false;
    }else {
      console.log('sd');
      this.keyupNameBool = true;
    }
  }
  checkFocusName(){
    this.colorNameBool = true;
  }
  checkBlurName(){
    this.colorNameBool = false;
    console.log('blur name');
    if(this.name != ''){
      this.validationName = false;
    }else {
      this.validationName = true;
    }
  }
   test = '';
  
   //password valid
   passwordKeyUp(){
     console.log(this.password.length);
    if(this.password.length <= 5){
      this.characterLengthPasswordBool = true;
    }else {
      this.characterLengthPasswordBool = false;
    }
  }
  checkFocusPassword(){
    this.colorPasswordBool = true;
  }
  checkBlurPassword(){
    this.colorPasswordBool = false;
    if(this.password != ''){
      this.validationPassword = false;
    }else {
      this.validationPassword = true;
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
    }
  }
  // for cell number
  checkFocusMobile(){
  }
  checkBlurMobile(){
    if(this.number != ''){
      this.validationMobile = false;
    }else {
      this.validationMobile = true;
    }
  }
  numberKeyUp(){
    var regex = new RegExp("^[0-9]*$");
    var regexdob = new RegExp("^(?!.*[\%\/\\\&\?\,\'\;\:\!\-]{2}).*$");
    if (regex.test(this.number) && regexdob.test(this.number)) {
      if(this.number.length <= 10){
        this.characterLengthNumberBool = false;
      }else {
        console.log('Mobile Number is too long');
        this.characterLengthNumberBool = true;
      }
      console.log('Ok');
      this.keyupNumberBool = false;
    }else {
      console.log('Invalid');
      this.keyupNumberBool = true;
    }
  }
}
