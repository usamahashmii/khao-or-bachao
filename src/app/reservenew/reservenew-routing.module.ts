import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservenewPage } from './reservenew.page';

const routes: Routes = [
  {
    path: '',
    component: ReservenewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservenewPageRoutingModule {}
