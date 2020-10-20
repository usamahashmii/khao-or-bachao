import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentlyreviewPageRoutingModule } from './recentlyreview-routing.module';

import { RecentlyreviewPage } from './recentlyreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentlyreviewPageRoutingModule
  ],
  declarations: [RecentlyreviewPage]
})
export class RecentlyreviewPageModule {}
