import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeService } from './services/upgrade.service';
import { TimeSlotService } from './services/time-slot.service';
import { EventBusService } from './services/event-bus-service';
import { CustomerService } from './services/customer-service.service';
import { AppointmentService } from './services/appointment.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UpgradeService,
    TimeSlotService,
    EventBusService,
    CustomerService,
    AppointmentService
  ]
})
export class SharedModule { }
