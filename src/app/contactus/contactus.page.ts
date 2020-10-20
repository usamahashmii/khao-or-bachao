import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { RestService } from '../rest.service';
import * as firebase from 'firebase';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  userId: string = '';
  email: string = '';
  name: string = '';
  message: string = '';

  loaderShow: boolean = false;
  userAuth: boolean = false;
  constructor(public menuCtrl: MenuController,public restService: RestService,
    public navCtrl: NavController,
    public toastController: ToasterService) { }

  ngOnInit() {
    if(firebase.auth().currentUser){
      this.userId = firebase.auth().currentUser.uid;
    }else{
      this.userAuth = false;
    }
  }
  openSideMenu(){
    this.menuCtrl.toggle();
  }
  emailUs(){
    if(this.validationName == false && this.validationEmail == false
      && this.validationMessage == false && this.keyupEmailBool == false){
        console.log('fine');
    
    var stringy = ({
      requestType: 'save_query',
      userId: this.userId,
      email: this.email,
      userName: this.personName,
      message: this.message
    });
    this.loaderShow = true;
    this.restService.emailUs(stringy).subscribe(data => {
      console.log(data);
      this.loaderShow = false;
      this.toastController.presentToastMessage('Message submitted Successfully!');
      this.navCtrl.navigateRoot('/tabs/home');
    } , err => {
      console.log(err);
      this.loaderShow = false;
      this.toastController.presentToastMessage('Some error occurred in sending message!');
    });

  }else{
    console.log('not fine');
  }
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
  validationMobile: any;
  keyupNumberBool: boolean = false;
  characterLengthNumberBool: boolean = false;
  colorMobileBool: boolean = false;
  validationMessage: any;
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

messageKeyUp(){
  var regex = new RegExp(/^[A-Za-z ]+$/);
  var regexdob = new RegExp("^(?!.*[\%\/\\\&\?\,\'\;\:\!\-]{2}).*$");
  if (regex.test(this.message) && regexdob.test(this.message)) {
  }
}
checkFocusMessage(){
  this.colorNameBool = true;
}
checkBlurMessage(){
  this.colorNameBool = false;
  if(this.message != ''){
    this.validationMessage = false;
  }else {
    this.validationMessage = true;
  }
}
}
