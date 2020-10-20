import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { AlerterrorService } from '../alerterror.service';
import { ToasterService } from '../toaster.service';
import { RestService } from '../rest.service';

import * as firebase from 'firebase';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  userId: string = '';
  notifications: any;
  discount: boolean = false;
  loaderShow: boolean = false;

  todayReservation: any;

  cityName: string = '';
  constructor(public loader: LoaderService,
    public alertService: AlerterrorService,
    public toastService: ToasterService,
    public menuCtrl: MenuController,
    public router: Router,
    public restService: RestService) { }

    ngOnInit() {
    }

  ionViewWillEnter() {
   
    if(firebase.auth().currentUser){
      this.userId = firebase.auth().currentUser.uid;
      var stringy=JSON.stringify({
        userID: this.userId,
        requestType: 'get'
      });
      //this.loader.presentLoader();
      this.loaderShow = true;
      this.restService.notifications(stringy).subscribe(response => {
        this.loaderShow = false;
        console.log(JSON.parse(response['_body']));
        this.notifications = JSON.parse(response['_body']).notifications;
        this.todayReservation = JSON.parse(response['_body']).today_reservations;
        console.log(this.todayReservation);
        //this.loader.hideLoader();
      },err => {
       // this.loader.hideLoader();
       this.loaderShow = false;
        this.alertService.presentAlertService(err);
      });

      this.userId = localStorage.getItem('userId');
      var stringy = JSON.stringify({
        userId: this.userId
      });
      this.restService.getUserCity(stringy).subscribe(data => {
        console.log(data);
        this.cityName = JSON.parse(data['_body']).city_name;
      } , err => {
        console.log(err);
      });
    }
    
  }
  openSideMenu(){
    this.menuCtrl.toggle();
  }
  chooseCity(){
    this.router.navigate(['/countries']);
  }
}
