import { CustomersComponent } from './components/pages/customers/customers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingUpgradeComponent } from './components/pages/booking-calender/booking-upgrade/booking-upgrade.component';
import { SetupFormComponent } from './components/pages/setup-calender/setup-form/setup-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin', component: BookingUpgradeComponent },
  { path: 'herid/:herid', component: BookingUpgradeComponent },
  { path: 'setupcalender', component: SetupFormComponent },
  { path: 'customers', component: CustomersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
