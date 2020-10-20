import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationdetailsPageRoutingModule } from './reservationdetails-routing.module';

import { ReservationdetailsPage } from './reservationdetails.page';
import { PipesModule } from '../pipes.module';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    PipesModule,
    StarRatingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationdetailsPageRoutingModule
  ],
  declarations: [ReservationdetailsPage]
})
export class ReservationdetailsPageModule {}
