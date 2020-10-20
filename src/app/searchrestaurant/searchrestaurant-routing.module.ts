import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchrestaurantPage } from './searchrestaurant.page';

const routes: Routes = [
  {
    path: '',
    component: SearchrestaurantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchrestaurantPageRoutingModule {}
