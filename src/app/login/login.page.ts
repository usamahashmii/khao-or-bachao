import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../firebaseauth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//ionic cordova plugin add cordova-plugin-facebook --variable FACEBOOK_APP_ID="2455881688035910" --variable FACEBOOK_DISPLAY_NAME="khaobachao"
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase';
import { LoaderService } from '../loader.service';
import { AlerterrorService } from '../alerterror.service';
import { ToasterService } from '../toaster.service';
import { RestService } from '../rest.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  name: string = '';

  userId: string = '';

  //characterLengthEmailBool: any;//: boolean = false
  keyupEmailBool: any;
  colorEmailBool: any;
  validationEmail: any;
  //password var
  characterLengthPasswordBool: any;
  colorPasswordBool: any;
  validationPassword: any;

  //loader
  loaderShow: boolean = false;

  //one signal
  oneSignalData: any;
  OneSignal_userid: any;
  oneSignal_pushToken: any;
  constructor(public firebaseAuthService: FirebaseauthService,
    public router: Router,
    public alertCtrl: AlertController,
    public facebook: Facebook,
    public restService: RestService,
    public oneSignal: OneSignal,
    //public loader: LoaderService,
    public alertError: AlerterrorService,
    public toastService: ToasterService
  ) {}
  login(){
    // check the condition for email
    if(this.email == ''){
      this.validationEmail = true;
    } 
    if(this.keyupEmailBool == true){
      this.keyupEmailBool = true;
    } 
    if(this.password == ''){
      this.validationPassword = true;
    } 
    if(this.keyupEmailBool == false &&
    this.validationEmail == false &&
    this.characterLengthPasswordBool == false &&
    this.validationPassword == false){
      //this.loader.presentLoader();
      this.loaderShow = true;
      this.firebaseAuthService.login(this.email , this.password).then(data => {
        console.log(data);
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
          this.userId = firebase.auth().currentUser.uid;
          
          var stringy = JSON.stringify({
            requestType : 'user',
            oneSignalID:  this.OneSignal_userid,
            userID: this.userId
          });
          this.restService.onesignalUpdate(stringy).subscribe(data => {
            console.log(data);

            this.loaderShow = false;
            this.email = '';
            this.password = '';
            this.toastService.presentToastFirebaseLogin();
            this.router.navigate(['/tabs/home']);
            
            localStorage.setItem('userId' , this.userId);

          } , err => {
            console.log(err);
          });
    
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
  //login with facebook

  loginwithFacebook(){
    //this.loader.presentLoader();
    this.loaderShow = true;
    this.facebook.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) =>{
      //get facebook account access
      let credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
    //  alert(credential + 'got credential');
      firebase.auth().signInWithCredential(credential).then(info => {
        //created account with facebook in firebase
        this.userId = info.user.uid;
        this.name = info.user.displayName; 
        this.email = info.user.email;
        localStorage.setItem('userId' , this.userId);
        //alert(info);
        //checking if user already have an account with facebook in firebase
        firebase.database().ref('userSignData/'+this.userId).once("value",snapshot => {
          if(snapshot.val()){
            // user already have an account
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
                this.toastService.presentToastFirebaseLogin();
                this.router.navigate(['/tabs/home']);
              } , err => {
                console.log(err);
              });
        
              });
          
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
      //this.loader.hideLoader();
      this.loaderShow = false;
      console.log(err);
    });
  }
  async resetPassword(){
    let alert = await this.alertCtrl.create({
      header: 'Enter your Email',
      message: 'A new password will be sent to you',
      inputs: [
        {
        name: 'recoverEmail',
        placeholder: 'you@example.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            //this.loader.presentLoader();
            this.loaderShow = true;
            // call user service
            this.firebaseAuthService.forgotPasswordUser(data.recoverEmail)
            .then(()=>{
              this.loaderShow = false;
              this.toastService.presentToastFirebaseResetPassword();
             },
             err => {
              this.loaderShow = false;
              this.alertError.presentAlertErrorPasswordReset();
          }
        ).catch(err => {
          this.loaderShow = false;
          this.alertError.presentAlertAuth(err);
        });
      }
      }
    ]
    });
    alert.present();
  }
  signupPage(){
    this.router.navigate(['/signup']);
  }
  ngOnInit() {
  }
  //validation of email and password
  //password valid
  passwordKeyUp(){
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

}
