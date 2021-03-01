import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TimeSlotService } from 'src/app/shared/services/time-slot.service';

@Component({
  selector: 'app-booking-container',
  templateUrl: './booking-container.component.html',
  styleUrls: ['./booking-container.component.css']
})
export class BookingContainerComponent implements OnInit, OnChanges { //


  timeSlotDays: any;
  @Input() upgradeId: string = "";

  constructor(private timeslotService: TimeSlotService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.upgradeId.currentValue) {
      if (this.upgradeId) {
        this.timeslotService.getTimeSlotDays()
          .subscribe((result: any) => {
            this.timeSlotDays = result
          });
      }
    }
  }


}
