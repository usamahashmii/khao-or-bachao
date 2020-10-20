import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinglerestaurantPage } from './singlerestaurant.page';

const routes: Routes = [
  {
    path: '',
    component: SinglerestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinglerestaurantPageRoutingModule {}
