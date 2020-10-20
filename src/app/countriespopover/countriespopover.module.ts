import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountriespopoverPageRoutingModule } from './countriespopover-routing.module';

import { CountriespopoverPage } from './countriespopover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountriespopoverPageRoutingModule
  ],
  declarations: [CountriespopoverPage]
})
export class CountriespopoverPageModule {}
