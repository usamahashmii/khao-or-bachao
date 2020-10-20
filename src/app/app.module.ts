import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FirebaseconfigService } from './firebaseconfig.service';
import { FirebaseauthService } from './firebaseauth.service';
import { SignupPageModule } from './signup/signup.module';
import { LoginPageModule } from './login/login.module';
import { ProfilePageModule } from './profile/profile.module';

import { HttpClientModule } from '@angular/common/http';

import { Facebook } from '@ionic-native/facebook/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpModule } from "@angular/http";
import { StarRatingModule } from 'ionic4-star-rating';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { Network } from '@ionic-native/network/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapPageModule } from './map/map.module';
import { DistancePipe } from './distance.pipe';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { DatePicker } from '@ionic-native/date-picker/ngx';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { DiscountPipe } from './pipes/discount.pipe';
import { StringbreakPipe } from './pipes/stringbreak.pipe';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@NgModule({
  declarations: [AppComponent, DistancePipe],
  entryComponents: [],
  imports: [
    StarRatingModule,
    Ionic4DatepickerModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    SignupPageModule,
    LoginPageModule,
    ProfilePageModule,
    MapPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseconfigService,
    FirebaseauthService,
    Facebook,
    Camera,
    Network,
    Geolocation,
    QRScanner,
    BarcodeScanner,
    DatePicker,
    LocalNotifications,
    SocialSharing,
    OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
