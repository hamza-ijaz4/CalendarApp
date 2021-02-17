import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingUpgradeComponent } from './components/pages/booking-calender/booking-upgrade/booking-upgrade.component';
import { BookingMainComponent } from './customer-page/booking-main/booking-main.component';


const routes: Routes = [
  { path: '', redirectTo: 'admin/editor', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), //Lazy load admin module
    data: { preload: true }
  },
  { path: 'herid/:herid', component: BookingUpgradeComponent},

  // { path: 'admin', component: UpgradeMainComponent, },
  // { path: 'time-slots', component: UpgradeMainComponent, },
  //{ path: 'herid/:herid', component: BookingUpgradeComponent },
  // { path: 'setupcalender', component: SetupFormComponent },
  // { path: 'customers', component: CustomersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
