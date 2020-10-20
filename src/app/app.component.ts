import { Component } from '@angular/core';

import { Platform,Events,MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseconfigService } from './firebaseconfig.service';

import * as firebase from 'firebase';
import { NetworkService } from './network.service';
import { ToasterService } from './toaster.service';
import { Routes, Router } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { FirebaseauthService } from './firebaseauth.service';
import { RestService } from './rest.service';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  checkauthenticationState: boolean = false;
  fullName: string = '';
  userId: string = '';
  notificationsCount: any;
  notifications: any;
  notificationsCountPrev: number = 0;
  
  public appPagesNoAuth = [
    {
      title: 'Home',
      url: '/tabs/home',
      img: 'home.png'
    },
   {
      title: 'login',
      url: '/login',
      img: 'svp.png'
    },
    {
      title: 'Profile',
      url: '/profile',
      img: 'svp.png'
    },
    /*{
      title: 'Filter',
      url: '/filters',
      img: 'svr.png'
    },*/
    {
      title: 'Reservations',
      url: '/reservation',
      img: 'svr.png'
    },
    {
      title: 'Recently Viewed',
      url: '/recent',
      img: 'eye.png'
    },
    {
      title: 'Email us',
      url: '/contactus',
      img: 'email.png'
    },
    {
      title: 'Rate us',
      url: '/term',
      img: 'star.png'
    },
     /*{
      title: 'Refer and Earn',
      url: '/term',
      img: 'dollar.png'
    },*/
   
   {
    title: 'Setting',
    url: '/setting',
    img: 'svs.png'
  },
   {
    title: 'FAQ',
    url: '/term',
    img: 'question.png'
  },
  {
    title: 'Term of Use',
    url: '/term',
    img: 'svt.png'
  },
  {
    title: 'Privacy Policy',
    url: '/term',//countries
    img: 'svt.png'
  },
  {
    title: 'About us',
    url: '/term',
    img: 'svn.png'
  },
     /*{
      title: 'signup',
      url: '/signup',
      img: 'svp.png'
    },
   {
    title: 'Recent',
    url: '/recent',
    img: 'svp.png'
  }*/
  /*{
   title: 'SingleCategory',
   url: '/single-category',
   icon: 'home'
 }*/
  ];
  public appPagesAuth = [
    {
      title: 'Home',
      url: '/tabs/home',
      img: 'home.png'
    },
    {
      title: 'Profile',
      url: '/profile',
      img: 'svp.png'
    },
    
    /*{
      title: 'Filter',
      url: '/filters',
      img: 'svr.png'
    },*/
    {
      title: 'Reservations',
      url: '/reservation',
      img: 'svr.png'
    },
    {
      title: 'Recently Viewed',
      url: '/recent',
      img: 'eye.png'
    },
    {
      title: 'Email us',
      url: '/contactus',
      img: 'email.png'
    },
    {
      title: 'Rate us',
      url: '/term',
      img: 'star.png'
    },
     /*{
      title: 'Refer and Earn',
      url: '/term',
      img: 'dollar.png'
    },*/
   
   {
    title: 'Setting',
    url: '/setting',
    img: 'svs.png'
  },
   {
    title: 'FAQ',
    url: '/term',
    img: 'question.png'
  },
  {
    title: 'Term of Use',
    url: '/term',
    img: 'svt.png'
  },
  {
    title: 'Privacy Policy',
    url: '/term',//countries
    img: 'svt.png'
  },
  {
    title: 'About us',
    url: '/term',
    img: 'svn.png'
  },
  {
    title: 'Logout',
    url: '/tabs/home',
    img: 'logout.png'
  },
  ];

  //one signal
  oneSignalData: any;
  OneSignal_userid: any;
  oneSignal_pushToken: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public firebaseConfiguration: FirebaseconfigService,
    public networkProvider:NetworkService,
    public events: Events,
    public firebase: FirebaseauthService,
    public toastService: ToasterService,
    public restService: RestService,
    public toaster: ToasterService,
    public menuCtrl: MenuController,
    public localNotifications: LocalNotifications,
    public router: Router,
    public oneSignal: OneSignal,
    public navCtrl: NavController
  ) {
    const routes: Routes = [
      {
        path: 'tabs',
        component: TabsPage,
        children: [
          {
            path: 'schedule',
            children: [
              {
                path: '',
                loadChildren: '../schedule/schedule.module#ScheduleModule'
              }
            ]
          },
          {
            path: '',
            redirectTo: '/app/tabs/schedule',
            pathMatch: 'full'
          }
        ]
      }
    ];
  
    // Initialize Firebase
    this.firebaseConfiguration.firebaseConfiguration();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.networkProvider.initializeNetworkEvents();

      this.oneSignal.startInit('e4c2c002-efd7-4cc5-9aa2-cc16376f8d8d', '879857704440');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
      // this.router.navigate(['/owner-profile'])
      });

      this.oneSignal.endInit();
     

        // Offline event
      this.events.subscribe('network:offline', () => {
        this.router.navigate(['/nointernet']);
        this.toaster.presentToastDisconnect();
      });
      // Online event
      this.events.subscribe('network:online', () => {
        this.router.navigate(['/tabs/home']);
        this.toaster.presentToastConnect();    
      });
      firebase.auth().onAuthStateChanged(user => {
        console.log('user');
      if(user) {
        this.userId = firebase.auth().currentUser.uid;
        this.checkauthenticationState = true;
        console.log(this.checkauthenticationState);
        this.router.navigate(['/tabs/home']);
        this.splashScreen.hide();
      }else {
        this.userId = '';
        this.checkauthenticationState = false;
        console.log(this.checkauthenticationState);
        this.router.navigate(['/tabs/home']);
        this.splashScreen.hide();
      }
    }); 
    this.statusBar.styleDefault();
    this.statusBar.backgroundColorByHexString('#b40404');
    });
  }
  /**repetative checking the new notifications */
  callFuntionAtIntervals(){ 
    if(firebase.auth().currentUser){
      var data = JSON.stringify({
        userID: firebase.auth().currentUser.uid,
        requestType: 'get'//
      });
      this.restService.notifications(data).subscribe(data => {
        //console.log(data['_body']);
        console.log(JSON.parse(data['_body']));
        this.notificationsCount = JSON.parse(data['_body']).count_unread;
        if(this.notificationsCountPrev != parseInt(JSON.parse(data['_body']).count_unread) && (parseInt(JSON.parse(data['_body']).count_unread) != 0)){
          // show notification
          this.firebase.getProfileData(firebase.auth().currentUser.uid).once("value" , snapshot => {
            this.fullName = snapshot.val().name;
            console.log(this.fullName + 'You have a new notification!');
            /*this.localNotifications.schedule({
              id: 1,
              title: `Hey! `+this.fullName,
              text: 'You have a new notification!',
              foreground: true,
            });*/
            console.log('New Notification!');
            this.notificationsCountPrev = parseInt(JSON.parse(data['_body']).count_unread);
          }); 
        }else {
          console.log('No Notification!');
        }  
        
        //this.notifications = JSON.parse(data['_body']).notifications;
      });
      
    }
    
  }
  private autoSaveInterval: any = setInterval( ()=>{
  
    if(this.userId != ''){
    //  this.callFuntionAtIntervals()
    }
    },10000
  );

  menuToggle(){
    this.menuCtrl.toggle();
  }
  logout(p){
    
   
  }
  //open pages from side menu
  openNoAuthPages(p){
    console.log('No auth page');
    console.log(p);
    this.navCtrl.navigateForward([p.url]);
  }
  openAuthPages(p){
    console.log('auth page');
    console.log(p);
    if(p.title == 'Logout'){
      this.firebase.logout();
      this.toastService.presentToastFirebaseLogout();
      //this.router.navigateByUrl('/tabs/home');
    }else {
      this.navCtrl.navigateForward([p.url]);
    }
  }
}
