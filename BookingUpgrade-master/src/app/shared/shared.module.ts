import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeService } from './services/upgrade.service';
import { TimeSlotService } from './services/time-slot.service';
import { EventBusService } from './services/event-bus-service';
import { CustomerService } from './services/customer-service.service';
import { AppointmentService } from './services/appointment.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastModule,
  ],
  providers: [
    UpgradeService,
    TimeSlotService,
    EventBusService,
    CustomerService,
    AppointmentService,
    MessageService
  ]
})
export class SharedModule { }
