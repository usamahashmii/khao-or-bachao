import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  
  constructor(public http: HttpClient,
    public toastCtrl: ToastController) {
    console.log('Hello ToasterProvider Provider');
  }
  //firebase auth toasters
  async presentToastFirebaseLogin(){
    let toast = await this.toastCtrl.create({
      message: 'You are logged in Successfully',
      position: 'top',
      duration: 1800,
      cssClass: 'danger',
      showCloseButton: true
    });
    return toast.present();
  }
  async presentToastFirebaseSignup(){
    let toast = await this.toastCtrl.create({
      message: 'You are Signed up Successfully',
      position: 'top',
      duration: 1800,
      cssClass: 'danger',
      showCloseButton: true
    });
    return toast.present();
  }
  async presentToastFirebaseLogout(){
    let toast = await this.toastCtrl.create({
      message: 'You are logged out Successfully',
      position: 'top',
      duration: 1800,
      cssClass: 'danger',
      showCloseButton: true
    });
    return toast.present();
  }
  async presentToastDisconnect(){
    let toast = await this.toastCtrl.create({
      message: 'Network was disconnected',
      position: 'top',
      duration: 1800,
      cssClass: 'danger',
      showCloseButton: true
    });
    return toast.present();
  }
  async presentToastConnect(){
    let toast = await this.toastCtrl.create({
      message: 'We got a wifi connection, woohoo!',
      position: 'top',
      duration: 1800,
      cssClass: 'danger',
      showCloseButton: true
    });
    return toast.present();
  }
  //update data
  async presentToastFirebaseUpdateData(){
    let toast = await this.toastCtrl.create({
      message: 'Your profile is updated Successfully',
      position: 'top',
      duration: 1800,
      cssClass: 'danger',
      showCloseButton: true
    });
    return toast.present();
  }
  //password reset Successfully
  async presentToastFirebaseResetPassword(){
    let toast = await this.toastCtrl.create({
      message: 'Your password reset Successfully',
      position: 'top',
      duration: 1800,
      cssClass: 'danger',
      showCloseButton: true
    });
    return toast.present();
  }
  //present toast message
  async presentToastMessage(msg){
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 3000,
      cssClass: 'danger',
      showCloseButton: true
    });
    return toast.present();
  }
  async presentToastMessageConfirm(msg){
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 6000,
      cssClass: 'danger',
      showCloseButton: true
    });
    return toast.present();
  }
  
}
