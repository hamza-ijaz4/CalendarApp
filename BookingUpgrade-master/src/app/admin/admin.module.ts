// angular modules
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// prime ng modules
import { TabViewModule } from 'primeng/tabview';

//components
import { AdminComponent } from './admin.component';
import { CustomersComponent } from './editor/customers/customers.component';
import { EditorComponent } from './editor/editor.component';
import { AdminRoutingModule } from './admin-routig.module';
import { AddUpgradeComponent } from './add-upgrade/add-upgrade.component';
import { TimeslotsContainerComponent } from './editor/upgrade-timeslots/timeslots/timeslots-container/timeslots-container.component';
import { TimeslotsDayComponent } from './editor/upgrade-timeslots/timeslots/timeslots-day/timeslots-day.component';
import { UpgradeTimeslotsComponent } from './editor/upgrade-timeslots/timeslots/upgrade-timeslots/upgrade-timeslots.component';
import { SharedModule } from '../shared/shared.module';
import { UpgradeMainComponent } from './editor/upgrade-timeslots/upgrade-timeslots.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TabViewModule,

    // custom modules
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    CustomersComponent,
    TimeslotsContainerComponent,
    TimeslotsDayComponent,
    UpgradeMainComponent,
    UpgradeTimeslotsComponent,
    EditorComponent,
    AddUpgradeComponent
  ],
  exports: [

  ],
  providers: []
})
export class AdminModule { }
