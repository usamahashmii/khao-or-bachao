import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationPageRoutingModule } from './reservation-routing.module';

import { ReservationPage } from './reservation.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { PipesModule } from '../pipes.module';

@NgModule({
  imports: [
    CommonModule,
    StarRatingModule,
    PipesModule,
    FormsModule,
    IonicModule,
    ReservationPageRoutingModule,
  ],
  declarations: [ReservationPage]
})
export class ReservationPageModule {}
