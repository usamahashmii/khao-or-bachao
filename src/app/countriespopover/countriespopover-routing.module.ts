import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriespopoverPage } from './countriespopover.page';

const routes: Routes = [
  {
    path: '',
    component: CountriespopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriespopoverPageRoutingModule {}
