import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingUpgradeComponent } from './components/pages/booking-calender/booking-upgrade/booking-upgrade.component';
import { SetupFormComponent } from './upgrade-client/admin-page/setup-new/setup-form/setup-form.component';
import { UpgradeMainComponent } from './upgrade-client/admin-page/main/upgrade-main/upgrade-main.component';
import { CustomersComponent } from './upgrade-client/admin-page/Add-customers/customers/customers.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin', component: UpgradeMainComponent, },
  { path: 'time-slots', component: UpgradeMainComponent, },
  { path: 'herid/:herid', component: BookingUpgradeComponent },
  { path: 'setupcalender', component: SetupFormComponent },
  { path: 'customers', component: CustomersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
