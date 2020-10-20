import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantcontactusPageRoutingModule } from './restaurantcontactus-routing.module';

import { RestaurantcontactusPage } from './restaurantcontactus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantcontactusPageRoutingModule
  ],
  declarations: [RestaurantcontactusPage]
})
export class RestaurantcontactusPageModule {}
