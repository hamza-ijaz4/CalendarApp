import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UpgradeGroupComponent } from './components/pages/booking-calender/upgrade-group/upgrade-group.component';
import { UpgradeDayComponent } from './components/pages/booking-calender/upgrade-day/upgrade-day.component';
import { UpgradeCalenderComponent } from './components/pages/booking-calender/upgrade-calender/upgrade-calender.component';
import { BookingUpgradeComponent } from './components/pages/booking-calender/booking-upgrade/booking-upgrade.component';


import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersComponent } from './admin/editor/customers/customers.component';
import { UpgradeMainComponent } from './admin/main/upgrade-main/upgrade-main.component';
import { TimeslotsDayComponent } from './admin/editor/timeslots/timeslots-day/timeslots-day.component';
import { BookingMainComponent } from './customer-page/booking-main/booking-main.component';
import { BookingTimeslotsComponent } from './customer-page/booking-timeslots/booking-timeslots.component';
import { BookingDaysComponent } from './customer-page/booking-days/booking-days.component';
import { TimeslotsContainerComponent } from './admin/editor/timeslots/timeslots-container/timeslots-container.component';
import { TopMenuComponent } from './admin/editor/top-menu/top-menu.component';
import { SetTimeComponent } from './admin/setup-new/set-time/set-time.component';
import { SetupFormComponent } from './admin/setup-new/setup-form/setup-form.component';
import { HeaderComponent } from './admin/layout/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    UpgradeGroupComponent,
    UpgradeDayComponent,
    UpgradeCalenderComponent,
    BookingUpgradeComponent,
    SetTimeComponent,
    SetupFormComponent,
    CustomersComponent,

    UpgradeMainComponent,
    TimeslotsDayComponent,
    BookingMainComponent,
    BookingTimeslotsComponent,
    BookingDaysComponent,
    TimeslotsContainerComponent,
    TopMenuComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
