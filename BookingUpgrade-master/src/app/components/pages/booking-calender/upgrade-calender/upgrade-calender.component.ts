import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { TimeSlotService } from 'src/app/services/time-slot.service';


@Component({
  selector: 'app-upgrade-calender',
  templateUrl: './upgrade-calender.component.html',
  styleUrls: ['./upgrade-calender.component.css']
})
export class UpgradeCalenderComponent implements OnInit, OnChanges { //

  appointmentDays: any;
  @Input() upgradeId: string = "";
  @Input() showBooking: boolean = true;

  constructor(private timeslotService: TimeSlotService) { }



  ngOnInit(): void {
    // this.appointmentService.getAppointmentDays()
    //   .subscribe(result => {
    //     this.appointmentDays = result
    //   });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.upgradeId.currentValue) {
      if (this.upgradeId) {
        this.timeslotService.getTimeSlotDaysByUpgradeId(this.upgradeId)
          .subscribe(result => {
            this.appointmentDays = result
          });
      }

    }
  }

}

