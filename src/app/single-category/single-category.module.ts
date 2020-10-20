import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleCategoryPageRoutingModule } from './single-category-routing.module';

import { SingleCategoryPage } from './single-category.page';
import { StarRatingModule } from 'ionic4-star-rating';
import { PipesModule } from '../pipes.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SingleCategoryPageRoutingModule,
    StarRatingModule
  ],
  declarations: [SingleCategoryPage]
})
export class SingleCategoryPageModule {}
