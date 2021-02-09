import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-upgrade-calender',
  templateUrl: './upgrade-calender.component.html',
  styleUrls: ['./upgrade-calender.component.css']
})
export class UpgradeCalenderComponent implements OnInit, OnChanges { //

  appointmentDays: any;
  @Input() upgradeId: string = "";

  constructor(private appointmentService: AppointmentService) { }


  
  ngOnInit(): void {
    // this.appointmentService.getAppointmentDays()
    //   .subscribe(result => {
    //     this.appointmentDays = result
    //   });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.upgradeId.currentValue) {
      if (this.upgradeId) {
        this.appointmentService.getAppointmentDaysByUpgradeId(this.upgradeId)
          .subscribe(result => {
            this.appointmentDays = result
          });
      }

    }
  }

}

