import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { TimeSlotService } from 'src/app/services/time-slot.service';

@Component({
  selector: 'app-upgrade-timeslots',
  templateUrl: './upgrade-timeslots.component.html',
  styleUrls: ['./upgrade-timeslots.component.css']
})
export class UpgradeTimeslotsComponent implements OnInit, OnChanges { //


  timeSlotDays: any;
  @Input() upgradeId: string = "";

  constructor(private timeslotService: TimeSlotService) { }


  
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.upgradeId.currentValue) {
      if (this.upgradeId) {
        this.timeslotService.getTimeSlotDaysByUpgradeId(this.upgradeId)
          .subscribe(result => {
            this.timeSlotDays = result
          });
      }

    }
  }

}
