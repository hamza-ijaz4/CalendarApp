import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TimeSlotService } from 'src/app/shared/services/time-slot.service';

@Component({
  selector: 'app-timeslots-container',
  templateUrl: './timeslots-container.component.html',
  styleUrls: ['./timeslots-container.component.css']
})
export class TimeslotsContainerComponent implements OnInit, OnChanges { //


  timeSlotDays: any;
  @Input() upgradeId: string = "";

  constructor(private timeslotService: TimeSlotService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.upgradeId.currentValue) {
      if (this.upgradeId && this.upgradeId != 'undefined') {
        console.log('upgradeId', this.upgradeId);
        this.timeslotService.getTimeSlotDaysByUpgradeId(this.upgradeId)
          .subscribe((result: any) => {
            this.timeSlotDays = result
          });
      }

    }
  }

}
