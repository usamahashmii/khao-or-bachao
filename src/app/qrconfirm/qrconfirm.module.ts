import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrconfirmPageRoutingModule } from './qrconfirm-routing.module';

import { QrconfirmPage } from './qrconfirm.page';
import { PipesModule } from '../pipes.module';
import { StarRatingModule } from 'ionic4-star-rating';

@NgModule({
  imports: [
    PipesModule,
    StarRatingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    QrconfirmPageRoutingModule
  ],
  declarations: [QrconfirmPage]
})
export class QrconfirmPageModule {}
