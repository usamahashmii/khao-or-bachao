import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantcontactusPage } from './restaurantcontactus.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantcontactusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantcontactusPageRoutingModule {}
