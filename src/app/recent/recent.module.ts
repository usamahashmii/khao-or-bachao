import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentPageRoutingModule } from './recent-routing.module';

import { RecentPage } from './recent.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { PipesModule } from '../pipes.module';

@NgModule({
  imports: [
    PipesModule,
    StarRatingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RecentPageRoutingModule
  ],
  declarations: [RecentPage]
})
export class RecentPageModule {}
