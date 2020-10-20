import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailusPageRoutingModule } from './emailus-routing.module';

import { EmailusPage } from './emailus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailusPageRoutingModule
  ],
  declarations: [EmailusPage]
})
export class EmailusPageModule {}
