import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlerterrorService {

  
  constructor(public http: HttpClient,
    public alertCtrl: AlertController) {
    console.log('Hello AlerterrorProvider Provider');
  }
  async presentAlertAuth(err){
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      subHeader: err.message,
      buttons: ['OK']
    });
    return alert.present();
  }
  async presentAlertService(err){
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      subHeader: err,
      buttons: ['OK']
    });
    return alert.present();
  }
  //resetting password Error
  async presentAlertErrorPasswordReset(){
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      subHeader: 'Password resetting error',
      buttons: ['OK']
    });
    return alert.present();
  }
  async presentAlertErrorWrongOTP(){
    const alert = await this.alertCtrl.create({
      header: 'OTP Alert',
      message: 'You Entered Wrong OTP.',
      buttons: ['OK']
    });
    return alert.present();
  }
}
