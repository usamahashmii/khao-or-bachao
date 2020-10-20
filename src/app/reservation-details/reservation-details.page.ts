import { Component, OnInit } from '@angular/core';
import { AlerterrorService } from '../alerterror.service';
import { LoaderService } from '../loader.service';
import { ToasterService } from '../toaster.service';
import { RestService } from '../rest.service';

import * as firebase from 'firebase';
import { FirebaseauthService } from '../firebaseauth.service';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.page.html',
  styleUrls: ['./reservation-details.page.scss'],
})
export class ReservationDetailsPage implements OnInit {

  userId: string = '';

  name: string = '';
  email: string = '';
  number: string = '';

  reservationDetails: any;

  //bar code vars
  scannedData: any;
  encodedData: '';
  encodeData: any;

  QRSCANNED_DATA: string;
  isOn = false;
  restaurantDetail: any;
  constructor(public alertService: AlerterrorService,
    public loader: LoaderService,
    public toastService: ToasterService,
    public restService: RestService,
    public firebase: FirebaseauthService,
    private qrScanner: QRScanner,
    public barcodeScanner: BarcodeScanner
    ) { }

  ngOnInit() {
    /*this.userId = firebase.auth().currentUser.uid;
    var stringy=JSON.stringify({
      userId: this.userId,

    });
    this.loader.presentLoader();
    this.restService.reservations(stringy).subscribe(response => {
      console.log(response['_body']);
      this.reservationDetails = JSON.parse(response['_body']);
      //call firebase to get the reservation owner data

      if(firebase.auth().currentUser){
        if (firebase.auth().currentUser.providerData[0].providerId == 'password') {
          console.log('login with normal');
        }else if(firebase.auth().currentUser.providerData[0].providerId == 'facebook.com'){
          console.log('login with Facebook');
        }
      }
      this.firebase.getProfileData(this.userId).once("value" , snapshot => {
        this.loader.hideLoader();
        if(snapshot.val()){
          this.name = snapshot.val().name;
          this.email = snapshot.val().email;
          //making a check to avoid undefined value
          if(snapshot.val().number){
            this.number = snapshot.val().number;
          }else {
            this.number = '';
          }
        }else {
          console.log('No data');
        }
      }).catch(err => {
        this.loader.hideLoader();
          //this.alertError.presentAlertAuth(err);
      });

    },err => {
      this.loader.hideLoader();
      this.alertService.presentAlertService(err);
    });
    */
  }
  //bar code show
  
  goToQrScan(){

  }
  goToCreateCode(){
    
  }


 
  

}
