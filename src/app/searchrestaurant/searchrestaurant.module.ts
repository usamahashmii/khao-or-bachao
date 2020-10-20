import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchrestaurantPageRoutingModule } from './searchrestaurant-routing.module';

import { SearchrestaurantPage } from './searchrestaurant.page';
import { PipesModule } from '../pipes.module';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    PipesModule,
    StarRatingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SearchrestaurantPageRoutingModule
  ],
  declarations: [SearchrestaurantPage]
})
export class SearchrestaurantPageModule {}
