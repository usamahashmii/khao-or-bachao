import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { LoaderService } from '../loader.service';
import { AlerterrorService } from '../alerterror.service';
import { FirebaseauthService } from '../firebaseauth.service';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  userId: string = '';
  name: string = '';
  profileImage: string = '';
  
  loaderShow: boolean = false;
  cityName: string = '';
  
  userAuth: boolean = false;
  constructor(
    public alertService: AlerterrorService,
    public storage: Storage,
    public firebase: FirebaseauthService) { }

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
        }else if(firebase.auth().currentUser.providerData[0].providerId == 'facebook.com'){
          console.log('login with Facebook');
        }
      }
      this.loaderShow = true;
      this.firebase.getProfileData(this.userId).once("value" , snapshot => {
        this.loaderShow = false;
        if(snapshot.val()){
          this.name = snapshot.val().name;
          //making a check to avoid undefined value
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
          this.alertService.presentAlertAuth('Some network error occurred');
      });
      
    }else {
      this.userAuth = false;
    }
    
  }

}
