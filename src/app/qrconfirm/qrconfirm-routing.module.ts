import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrconfirmPage } from './qrconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: QrconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrconfirmPageRoutingModule {}
