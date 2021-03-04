import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TimeSlotService } from 'src/app/shared/services/time-slot.service';
import { addDays } from 'date-fns'

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

  timeEnd1!: any;
  timeEnd2!: any;
  timeEnd3!: any;
  timeEnd4!: any;
  timeEnd5!: any;

  slotsTime1!: number;
  slotsTime2!: number;
  slotsTime3!: number;
  slotsTime4!: number;
  slotsTime5!: number;
  hoursPerDay: any[] = [];

  constructor(private _timeSlotService: TimeSlotService
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
      timeValue = `${this.checkhour(hour)}:0${min}:00`;
    } else {
      timeValue = `${this.checkhour(hour)}:${min}:00`;
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

  onEndTimeSelect($event: any, timeSlot: number) {
    let timeValue = ''
    let hour = new Date($event).getHours();
    let min = new Date($event).getMinutes();
    if (min < 10) {
      timeValue = `${this.checkhour(hour)}:0${min}:00`;
    } else {
      timeValue = `${this.checkhour(hour)}:${min}:00`;
    }

    if (timeSlot == 1) {
      this.timeEnd1 = timeValue;
      return;
    }
    else if (timeSlot == 2) {
      this.timeEnd2 = timeValue;
      return;
    }
    else if (timeSlot == 3) {
      this.timeEnd3 = timeValue;
      return;
    }
    else if (timeSlot == 4) {
      this.timeEnd4 = timeValue;
      return;
    }
    else if (timeSlot == 5) {
      this.timeEnd5 = timeValue;
      return;
    }

  }

  checkhour(hour: number) {
    if (hour < 10) {
      return '0' + hour;
    }
    return hour;
  }

  save() {
    let timeGroups = [];
    if (this.selectedHour?.hour > 0) {
      timeGroups.push({ "startTime": this.timeStart1, "endTime": this.timeEnd1, "slots": this.slotsTime1 });
    }
    if (this.selectedHour?.hour > 1) {
      timeGroups.push({ "startTime": this.timeStart2, "endTime": this.timeEnd2, "slots": this.slotsTime2 });
    }
    if (this.selectedHour?.hour > 2) {
      timeGroups.push({ "startTime": this.timeStart3, "endTime": this.timeEnd3, "slots": this.slotsTime3 });
    }
    if (this.selectedHour?.hour > 3) {
      timeGroups.push({ "startTime": this.timeStart4, "endTime": this.timeEnd4, "slots": this.slotsTime4 });
    }
    if (this.selectedHour?.hour > 4) {
      timeGroups.push({ "startTime": this.timeStart5, "endTime": this.timeEnd5, "slots": this.slotsTime5 });
    }

    let timeGroupsJson = JSON.stringify(timeGroups);
    let obj = {
      "startDate": addDays(new Date(this.startDate), 1),
      "endDate": addDays(new Date(this.endDate), 1),
      "timesGroup": timeGroupsJson
    };
    console.log(obj);
    this._timeSlotService.createMultipleTimeSlots(obj).subscribe((result: any) => {
      this.displayModal = false;
    })

  }


}
