// angular modules
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// prime ng modules
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';

import { AgGridModule } from 'ag-grid-angular';

//components
import { AdminComponent } from './admin.component';
import { CustomersComponent } from './editor/customers/customers.component';
import { EditorComponent } from './editor/editor.component';
import { AdminRoutingModule } from './admin-routig.module';
import { AddUpgradeComponent } from './add-upgrade/add-upgrade.component';
import { TimeslotsContainerComponent } from './editor/timeslots/timeslots-container/timeslots-container.component';
import { TimeslotsDayComponent } from './editor/timeslots/timeslots-day/timeslots-day.component';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { AppointmentsOverviewComponent } from './appointments-overview/appointments-overview.component';
import { BtnCellRenderer } from './appointments-overview/btn-cell-renderer.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,

    // primeng modules
    TabViewModule,
    CardModule,

    // ag-grid
    AgGridModule.withComponents([BtnCellRenderer]),

    // custom modules
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    BtnCellRenderer,
    CustomersComponent,
    TimeslotsContainerComponent,
    TimeslotsDayComponent,
    EditorComponent,
    AddUpgradeComponent,
    AppointmentsOverviewComponent
  ],
  exports: [

  ],
  providers: [

  ]
})
export class AdminModule { }
