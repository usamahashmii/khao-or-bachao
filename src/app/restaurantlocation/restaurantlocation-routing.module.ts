import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantlocationPage } from './restaurantlocation.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantlocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantlocationPageRoutingModule {}
