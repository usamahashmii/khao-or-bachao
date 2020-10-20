import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { FirebaseauthService } from '../firebaseauth.service';
import { Router } from '@angular/router';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ToasterService } from '../toaster.service';
import { LoaderService } from '../loader.service';
import { AlerterrorService } from '../alerterror.service';
import { RestService } from '../rest.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  //ngModels
  name: string = '';
  email: string = '';
  number: string = '';
  password: string = '';
  userId: string = '';

  //name var
  characterLengthNameBool: any;//: boolean = false
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
  colorPasswordBool: any;
  validationPassword: any;

  //number var
  keyupNumberBool: any;
  characterLengthNumberBool: any;
  validationMobile: any;

  //one signal
  oneSignalData: any;
  OneSignal_userid: any;
  oneSignal_pushToken: any;

  //loader bool
  loaderShow: boolean = false;
  constructor(public alertCtrl: AlertController,
    public firebaseAuthService: FirebaseauthService,
    public router: Router,
    public facebook: Facebook,
    public oneSignal: OneSignal,
    public toastService: ToasterService,
    //public loader: LoaderService,
    public alertError: AlerterrorService,
    public restService: RestService) { }

  ngOnInit() {
  }
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  signup(){
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
    if(this.password == ''){
      this.validationPassword = true;
    } 
    // check the condition for re password
    if(this.number == ''){
      this.validationMobile = true;
    }
    if(this.keyupNumberBool == true){
      this.keyupNumberBool = true;
    }
   
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
     ///
     if(this.number.length == 10){
     this.loaderShow = true;
      //this.loader.presentLoader();
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container'
      ,{
        size: "invisible"
      });
      const appVerifier = this.recaptchaVerifier;
      var capchtaNum = this.number;
      const phoneNumberString = "+92" + this.number;
      firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
        .then( confirmationResult => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          //this.loader.hideLoader();
          this.loaderShow = false;
          this.presentAlertConfirm(confirmationResult);
          })
          .catch(function (error) {
        console.error("SMS not sent", error);
        this.loaderShow = false;
        alert("SMS not sent");
        this.loader.hideLoader();
      });
    }else {
        this.toastService.presentToastMessage('Please enter last 10 characters of your cell number!');
      }
    }else {
      console.log('No');
    }
  }
  async presentAlertConfirm(confirmationResult) {
    const alert = await this.alertCtrl.create({
      header: 'Enter the Confirmation code!',
      inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
      buttons: [
        { text: 'Cancel',
          handler: data => { console.log('Cancel clicked'); }
        },
        { text: 'Send',
          handler: data => {
            this.loaderShow = true;
            confirmationResult.confirm(data.confirmationCode)
            .then(result => {
              // User signed in successfully.
              console.log(result.user);
              this.createAccountFirebaseDatabase();
            }).catch(error => {
              // User couldn't sign in (bad verification code?)
              this.alertError.presentAlertErrorWrongOTP();
            });
          }
        }
      ]
    });
    alert.present();
  }

  createAccountFirebaseDatabase(){
    //firebase.auth().signOut();
    firebase.auth().currentUser.delete();
    //this.loader.presentLoader();
   /* 
    */
        //success case
        //call firebase to sign up
        
        this.firebaseAuthService.createNewAccount(this.email , this.password).then(data => {
        //account created
        console.log(data);
        this.userId = firebase.auth().currentUser.uid;
        let user = firebase.auth().currentUser;
        localStorage.setItem('userId' , this.userId);
        //user.sendEmailVerification();
        //console.log(user.emailVerified);
        firebase.database().ref('userSignData/' + this.userId).update({
          name: this.name,
          email: this.email,
          number: this.number
        });
        var stringy = JSON.stringify({
          userId: this.userId,
          name: this.name,
          email: this.email,
          number: this.number,
          loginType: 'normal',
        //  password:
        //  user_type
        });
        this.restService.createAccountCall(stringy).subscribe(reponse => {
          this.oneSignal.getIds().then((id) => {
            //console.log(id);
           
            this.oneSignalData = id;
            this.OneSignal_userid = this.oneSignalData.userId
            this.oneSignal_pushToken = this.oneSignalData.pushToken
            console.log("One Signal Id's coming here");
            console.log(this.OneSignal_userid)
            console.log(this.oneSignal_pushToken)
            console.log(this.oneSignalData)
            
            var stringy = JSON.stringify({
              requestType : 'user',
              oneSignalID:  this.OneSignal_userid,
              userID: this.userId
            });
            this.restService.onesignalUpdate(stringy).subscribe(data => {
              console.log(data);
            
              console.log(reponse['_body']);
              console.log(JSON.parse(reponse['_body']));
              if(JSON.parse(reponse['_body']).status == 'success'){
                this.loaderShow = false;
                this.toastService.presentToastFirebaseSignup();
                this.router.navigate(['/tabs/home']);
              }else{
                //failed case
                //this.loader.hideLoader();
                this.loaderShow = false;
                var errMessage = JSON.parse(reponse['_body']).message; 
                this.alertError.presentAlertService(errMessage);
                }
              } , err => {
                console.log(err);
              });
            });
          } , err => {
            //error occured in sending server request
            //this.loader.hideLoader();
            this.loaderShow = false;
            this.alertError.presentAlertService(err);
          });
        //this.loader.hideLoader();
       // this.loaderShow = false;
        
        }).catch(err => {
          //firebase account creation failed
          //this.loader.hideLoader();
          this.loaderShow = false;
          this.alertError.presentAlertAuth(err);
        }); 
      /**/
  }
   //login with facebook
   loginwithFacebook(){
    //this.loader.presentLoader();
    this.loaderShow = true;
    this.facebook.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) =>{
      //get facebook account access
      let credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
      firebase.auth().signInWithCredential(credential).then(info => {
        //created account with facebook in firebase
        this.userId = info.user.uid;
        this.name = info.user.displayName; 
        this.email = info.user.email;
        localStorage.setItem('userId' , this.userId);
        //checking if user already have an account with facebook in firebase
        firebase.database().ref('userSignData/'+this.userId).once("value",snapshot => {
          if(snapshot.val()){
            // user already have an account
            //this.loader.hideLoader();
            this.loaderShow = false;
            this.toastService.presentToastFirebaseLogin();
            this.router.navigate(['/tabs/home']);
          }else{
            // user have no account
            firebase.database().ref('userSignData/' + this.userId ).update({ 
              name: this.name,
              email: this.email
            }).then(()=>{
              //now call the server to create the user account as well
              //this.loader.hideLoader();//remove when uncomment the server code
              this.loaderShow = false;
              var data = JSON.stringify({
                userId: this.userId,
                name: this.name,
                email: this.email,
                loginType: 'facebook'
              });
              this.restService.createAccountCall(data).subscribe(response => {
                //account created on server
                //this.loader.hideLoader();
                this.oneSignal.getIds().then((id) => {
                  //console.log(id);
                 
                  this.oneSignalData = id;
                  this.OneSignal_userid = this.oneSignalData.userId
                  this.oneSignal_pushToken = this.oneSignalData.pushToken
                  console.log("One Signal Id's coming here");
                  console.log(this.OneSignal_userid)
                  console.log(this.oneSignal_pushToken)
                  console.log(this.oneSignalData)
                  
                  var stringy = JSON.stringify({
                    requestType : 'user',
                    oneSignalID:  this.OneSignal_userid,
                    userID: this.userId
                  });
                  this.restService.onesignalUpdate(stringy).subscribe(data => {
                    console.log(data);
                      
                    this.loaderShow = false;
                    this.toastService.presentToastFirebaseSignup();
                    this.router.navigate(['/tabs/home']);
                  } , err => {
                    console.log(err);
                  });
            
                  });
               
              },err  => {
                //problem in creation of account on server
                //this.loader.hideLoader();
                this.loaderShow = false;
                this.alertError.presentAlertService(err);
              });
            });
          }
        });
      }).catch(err => {
        this.loaderShow = false;
        this.alertError.presentAlertAuth(err);
      })
    }).catch(err => {
      this.loaderShow = false;
      //this.loader.hideLoader();
      console.log(err);
    });
  }
  loginPage(){
    this.router.navigate(['/login']);
  }
  //validations of input fields
  //name
  nameKeyUp(){
    var regex = new RegExp(/^[A-Za-z ]+$/);
    var regexdob = new RegExp("^(?!.*[\%\/\\\&\?\,\'\;\:\!\-]{2}).*$");
    if (regex.test(this.name) && regexdob.test(this.name)) {
      if(this.name.length <= 20){
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
