import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlerterrorService } from '../alerterror.service';
import * as firebase from 'firebase';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  knobValues:any;
  loaderShow: boolean = false;
  categoryId: any;
  itemName: any;
  imageUrl: any;
  
  constructor(public route:ActivatedRoute,
    public restService: RestService,
    public alertService: AlerterrorService,
    public toastService: ToasterService,
    public router: Router) {
      this.route.queryParams.subscribe(data =>{
        this.categoryId = data.retaurantDetail;
        this.itemName = data.itemName
        this.imageUrl = data.imageUrl;
        console.log(this.categoryId);
    });
    }

    LowToHigh(){
     /* var stringy = JSON.stringify({
        requestType: 'price_desc',
        categoryId: this.categoryId
      });*/
      let navigationExtras: NavigationExtras = {
        queryParams:{
          retaurantDetail: this.categoryId,
          itemName: this.itemName,
          requestType: 'price_desc',
        }
      }
      this.router.navigate(['/single-category'] , navigationExtras );
      /*this.loaderShow = true;
      this.restService.getFiltersRestaurant(stringy).subscribe(response => {
        console.log(JSON.parse(response['_body']));
        this.loaderShow = false;
      }, err=> {
      this.loaderShow = false;
      this.alertService.presentAlertService(err);
      });*/
      }
    highToLow(){
     
      let navigationExtras: NavigationExtras = {
        queryParams:{
          retaurantDetail: this.categoryId,
          itemName: this.itemName,
          requestType: 'price_asc',
        }
      }
      this.router.navigate(['/single-category'] , navigationExtras );
    }
    //rating
    rating(){
     
      let navigationExtras: NavigationExtras = {
        queryParams:{
          retaurantDetail: this.categoryId,
          itemName: this.itemName,
          requestType: 'rating_asc',
        }
      }
      this.router.navigate(['/single-category'] , navigationExtras );
    }
    //maps
    openMaps(){
      //if(firebase.auth().currentUser){
        console.log('Ok');
        let navigationExtras: NavigationExtras = {
          queryParams:{
            retaurantDetail: this.categoryId,
            imageUrl: this.imageUrl,
            itemName: this.itemName
          }
        }
        this.router.navigate(['/map'] , navigationExtras);
     /* }else {
        this.toastService.presentToastMessage('Please login or create an account first!');
      }*/
    }
    clickDiscount(val){
      let navigationExtras: NavigationExtras = {
        queryParams:{
          retaurantDetail: this.categoryId,
          itemName: this.itemName,
          requestType: 'discount',
          value: val
        }
      }
      this.router.navigate(['/single-category'] , navigationExtras );
    }
  ngOnInit() {
  }
  changeRange(ev){
    console.log(ev.detail.value);
    if(ev.detail.value == 0){
      var dollar = '$';
      let navigationExtras: NavigationExtras = {
        queryParams:{
          retaurantDetail: this.categoryId,
          itemName: this.itemName,
          requestType: 'price_range',
          dollar: dollar
        }
      }
      this.router.navigate(['/single-category'] , navigationExtras );
    }
    else if(ev.detail.value == 33){
      var dollar = '$';
      let navigationExtras: NavigationExtras = {
        queryParams:{
          retaurantDetail: this.categoryId,
          itemName: this.itemName,
          requestType: 'price_range',
          dollar: dollar
        }
      }
      this.router.navigate(['/single-category'] , navigationExtras );

    }else if(ev.detail.value == 66){
      var dollar = '$$';
      let navigationExtras: NavigationExtras = {
        queryParams:{
          retaurantDetail: this.categoryId,
          itemName: this.itemName,
          requestType: 'price_range',
          dollar: dollar
        }
      }
      this.router.navigate(['/single-category'] , navigationExtras );
    }else if(ev.detail.value == 99){
      var dollar = '$$$';
      let navigationExtras: NavigationExtras = {
        queryParams:{
          retaurantDetail: this.categoryId,
          itemName: this.itemName,
          requestType: 'price_range',
          dollar: dollar
        }
      }
      this.router.navigate(['/single-category'] , navigationExtras );
    }
  }
  changeCircle(){
    console.log('moeeds');
    console.log(this.knobValues);
  }

}
