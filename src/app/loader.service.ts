import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader: any;
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController) {
    console.log('Hello LoadersProvider Provider');
  }

  async presentLoader(){
    this.loader = await this.loadingCtrl.create({
      message: `
      <div class="custom-spinner-container">
      <div class="custom-spinner-box"><img src="assets/imgs/loader.gif"></div>
      </div>`,
    });
    return this.loader.present();
  }
  async hideLoader(){
    return await this.loader.dismiss();
  }
}
