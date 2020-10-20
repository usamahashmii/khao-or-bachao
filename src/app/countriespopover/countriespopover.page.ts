import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-countriespopover',
  templateUrl: './countriespopover.page.html',
  styleUrls: ['./countriespopover.page.scss'],
})
export class CountriespopoverPage implements OnInit {

  countriesArray = [{
    id: 1,
    name: 'Pakistan',
    flag: 'flag',
    code: '+92'
  },
  {
    id: 2,
    name: 'Hong Kong',
    flag: 'hong-kong-flag',
    code: '+823'
  }]
  constructor(public popOver: PopoverController) { }

  ngOnInit() {
  }
  selectCountryCode(value){
    console.log(value);
    this.popOver.dismiss({
      value
    });
  }

}
