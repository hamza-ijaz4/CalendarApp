// angular modules
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// prime ng modules
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';

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

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,

    // primeng modules
    TabViewModule,
    CardModule,

    // custom modules
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    CustomersComponent,
    TimeslotsContainerComponent,
    TimeslotsDayComponent,
    EditorComponent,
    AddUpgradeComponent
  ],
  exports: [

  ],
  providers: [

  ]
})
export class AdminModule { }
