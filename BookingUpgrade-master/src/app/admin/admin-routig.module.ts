import { EditorComponent } from './timeslots/editor.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { UpgradeLogComponent } from "./history-log/upgrade-log/upgrade-log.component";
import { AddUpgradeComponent } from './add-upgrade/add-upgrade.component';
import { AppointmentsOverviewComponent } from './appointments-overview/appointments-overview.component';
import { InviterComponent } from './inviter/inviter.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
        //  { path: 'customers', component: CustomersComponent },
          { path: 'editor', component: EditorComponent },
          { path: 'add-upgrade', component: AddUpgradeComponent },
          { path: 'overview', component: AppointmentsOverviewComponent},
          { path: 'invite', component: InviterComponent},
          { path: 'history', component: UpgradeLogComponent},
          { path: '', redirectTo: 'editor', pathMatch: 'full' }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
