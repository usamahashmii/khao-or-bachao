import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservenewPageRoutingModule } from './reservenew-routing.module';

import { ReservenewPage } from './reservenew.page';
import { PipesModule } from '../pipes.module';
import { StarRatingModule } from 'ionic4-star-rating';
import { CountriespopoverPageModule } from '../countriespopover/countriespopover.module';

@NgModule({
  imports: [
    PipesModule,
    StarRatingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReservenewPageRoutingModule,
    CountriespopoverPageModule
  ],
  declarations: [ReservenewPage]
})
export class ReservenewPageModule {}
