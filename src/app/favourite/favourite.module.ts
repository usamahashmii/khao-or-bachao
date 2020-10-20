import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritePageRoutingModule } from './favourite-routing.module';

import { FavouritePage } from './favourite.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';
import { PipesModule } from '../pipes.module';

@NgModule({
  imports: [
    Ionic4DatepickerModule,
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritePageRoutingModule,
    StarRatingModule
  ],
  declarations: [FavouritePage]
})
export class FavouritePageModule {}
