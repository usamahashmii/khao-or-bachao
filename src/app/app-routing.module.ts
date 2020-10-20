import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
 
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'reservation-details',
    loadChildren: () => import('./reservation-details/reservation-details.module').then( m => m.ReservationDetailsPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./favourite/favourite.module').then( m => m.FavouritePageModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./reservation/reservation.module').then( m => m.ReservationPageModule)
  },
  {
    path: 'recent',
    loadChildren: () => import('./recent/recent.module').then( m => m.RecentPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'single-category',
    loadChildren: () => import('./single-category/single-category.module').then( m => m.SingleCategoryPageModule)
  },
  {
    path: 'nointernet',
    loadChildren: () => import('./nointernet/nointernet.module').then( m => m.NointernetPageModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./filters/filters.module').then( m => m.FiltersPageModule)
  },
  {
    path: 'singlerestaurant',
    loadChildren: () => import('./singlerestaurant/singlerestaurant.module').then( m => m.SinglerestaurantPageModule)
  },
  {
    path: 'reservationdetails',
    loadChildren: () => import('./reservationdetails/reservationdetails.module').then( m => m.ReservationdetailsPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'term',
    loadChildren: () => import('./term/term.module').then( m => m.TermPageModule)
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesPageModule)
  },
  {
    path: 'searchrestaurant',
    loadChildren: () => import('./searchrestaurant/searchrestaurant.module').then( m => m.SearchrestaurantPageModule)
  },
  {
    path: 'recentlyreview',
    loadChildren: () => import('./recentlyreview/recentlyreview.module').then( m => m.RecentlyreviewPageModule)
  },
  {
    path: 'emailus',
    loadChildren: () => import('./emailus/emailus.module').then( m => m.EmailusPageModule)
  },
  {
    path: 'qrconfirm',
    loadChildren: () => import('./qrconfirm/qrconfirm.module').then( m => m.QrconfirmPageModule)
  },
  {
    path: 'reservenew',
    loadChildren: () => import('./reservenew/reservenew.module').then( m => m.ReservenewPageModule)
  },
  {
    path: 'restaurantlocation',
    loadChildren: () => import('./restaurantlocation/restaurantlocation.module').then( m => m.RestaurantlocationPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'countriespopover',
    loadChildren: () => import('./countriespopover/countriespopover.module').then( m => m.CountriespopoverPageModule)
  },
  {
    path: 'restaurantcontactus',
    loadChildren: () => import('./restaurantcontactus/restaurantcontactus.module').then( m => m.RestaurantcontactusPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
