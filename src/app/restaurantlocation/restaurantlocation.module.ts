import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantlocationPageRoutingModule } from './restaurantlocation-routing.module';

import { RestaurantlocationPage } from './restaurantlocation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantlocationPageRoutingModule
  ],
  declarations: [RestaurantlocationPage]
})
export class RestaurantlocationPageModule {}
