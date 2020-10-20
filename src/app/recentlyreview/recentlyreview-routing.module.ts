import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentlyreviewPage } from './recentlyreview.page';

const routes: Routes = [
  {
    path: '',
    component: RecentlyreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentlyreviewPageRoutingModule {}
