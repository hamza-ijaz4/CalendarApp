import { EditorComponent } from './editor/editor.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CustomersComponent } from "./editor/customers/customers.component";
import { AddUpgradeComponent } from './add-upgrade/add-upgrade.component';
import { AppointmentsOverviewComponent } from './appointments-overview/appointments-overview.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: 'customers', component: CustomersComponent },
          { path: 'editor', component: EditorComponent },
          { path: 'add-upgrade', component: AddUpgradeComponent },
          { path: 'overview', component: AppointmentsOverviewComponent},
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
