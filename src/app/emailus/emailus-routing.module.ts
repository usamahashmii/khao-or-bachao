import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailusPage } from './emailus.page';

const routes: Routes = [
  {
    path: '',
    component: EmailusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailusPageRoutingModule {}
