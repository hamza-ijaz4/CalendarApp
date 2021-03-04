// angular modules
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// prime ng modules
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';

import { AgGridModule } from 'ag-grid-angular';

//components
import { AdminComponent } from './admin.component';
import { CustomersComponent } from './history-log/customers/customers.component';
import { EditorComponent } from './timeslots/editor.component';
import { AdminRoutingModule } from './admin-routig.module';
import { AddUpgradeComponent } from './add-upgrade/add-upgrade.component';
import { TimeslotsContainerComponent } from './timeslots/timeslots-container/timeslots-container.component';
import { TimeslotsDayComponent } from './timeslots/timeslots-day/timeslots-day.component';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { AppointmentsOverviewComponent } from './appointments-overview/appointments-overview.component';
import { BtnCellRenderer } from './appointments-overview/btn-cell-renderer.component';
import { InviterComponent } from './inviter/inviter.component';
import { UpgradeLogComponent } from './history-log/upgrade-log/upgrade-log.component';
import { SaveTimeSlotsComponent } from './timeslots/save-timeslots/save-timeslots.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,

    // primeng modules
    TabViewModule,
    CardModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    BadgeModule,

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
    SaveTimeSlotsComponent,
    EditorComponent,
    AddUpgradeComponent,
    AppointmentsOverviewComponent,
    InviterComponent,
    UpgradeLogComponent
  ],
  exports: [

  ],
  providers: [

  ]
})
export class AdminModule { }
