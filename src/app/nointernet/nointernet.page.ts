import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-nointernet',
  templateUrl: './nointernet.page.html',
  styleUrls: ['./nointernet.page.scss'],
})
export class NointernetPage implements OnInit {

  constructor(public menuCtrl: MenuController) { }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }
  ngOnInit() {

  }

}
