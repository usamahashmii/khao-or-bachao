import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationDetailsPageRoutingModule } from './reservation-details-routing.module';

import { ReservationDetailsPage } from './reservation-details.page';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationDetailsPageRoutingModule,
    StarRatingModule
  ],
  declarations: [ReservationDetailsPage]
})
export class ReservationDetailsPageModule {}
