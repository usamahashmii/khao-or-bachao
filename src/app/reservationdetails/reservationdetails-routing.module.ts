import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationdetailsPage } from './reservationdetails.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationdetailsPageRoutingModule {}
