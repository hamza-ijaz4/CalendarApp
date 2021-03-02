import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TimeSlotService } from 'src/app/shared/services/time-slot.service';

export interface BookingDto {
  day: any,
  time: any,
  herId: string
}

@Component({
  selector: 'app-save-timeslots',
  templateUrl: './save-timeslots.component.html',
})
export class SaveTimeSlotsComponent implements OnInit {

  displayModal!: boolean;

  startDate!: Date;
  endDate!: Date;

  selectedHour!: any;
  timeStart1!: any;
  timeStart2!: any;
  timeStart3!: any;
  timeStart4!: any;
  timeStart5!: any;
  slotsTime1!: number;
  slotsTime2!: number;
  slotsTime3!: number;
  slotsTime4!: number;
  slotsTime5!: number;
  hoursPerDay: any[] = [];

  constructor(
  ) { }

  ngOnInit(): void {
    this.initHours();
  }

  show() {
    this.displayModal = true;
  }

  initHours() {
    let items = [
      {
        "hour": 1
      },
      {
        "hour": 2
      },
      {
        "hour": 3
      },
      {
        "hour": 4
      },
      {
        "hour": 5
      }
    ];
    this.hoursPerDay = items;
  }

  onTimeSelect($event: any, timeSlot: number) {
    let timeValue = ''
    let hour = new Date($event).getHours();
    let min = new Date($event).getMinutes();
    if (min < 10) {
      timeValue = `${hour}:0${min}`;
    } else {
      timeValue = `${hour}:${min}`;
    }

    if (timeSlot == 1) {
      this.timeStart1 = timeValue;
      return;
    }
    else if (timeSlot == 2) {
      this.timeStart2 = timeValue;
      return;
    }
    else if (timeSlot == 3) {
      this.timeStart3 = timeValue;
      return;
    }
    else if (timeSlot == 4) {
      this.timeStart4 = timeValue;
      return;
    }
    else if (timeSlot == 5) {
      this.timeStart5 = timeValue;
      return;
    }

  }

  save() {
    let timeGroups = [];
    if (this.selectedHour?.hour > 0) {
      timeGroups.push({ "startTime": this.timeStart1, "slots": this.slotsTime1 });
    }
    if (this.selectedHour?.hour > 1) {
      timeGroups.push({ "startTime": this.timeStart2, "slots": this.slotsTime2 });
    }
    if (this.selectedHour?.hour > 2) {
      timeGroups.push({ "startTime": this.timeStart3, "slots": this.slotsTime3 });
    }
    if (this.selectedHour?.hour > 3) {
      timeGroups.push({ "startTime": this.timeStart4, "slots": this.slotsTime4 });
    }
    if (this.selectedHour?.hour > 4) {
      timeGroups.push({ "startTime": this.timeStart5, "slots": this.slotsTime5 });
    }

    let timeGroupsJson = JSON.stringify(timeGroups);
    let obj = {
      "startDate": this.startDate,
      "endDate": this.endDate,
      "timesGroup": timeGroupsJson
    };
    console.log(obj);
    this.displayModal = false;
  }


}
