import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { TimeSlotService } from 'src/app/shared/services/time-slot.service';
import { environment } from 'src/environments/environment';
import { getDay, parseISO } from 'date-fns'

export interface BookingDto {
  day: any,
  time: any,
  herId: string
}

@Component({
  selector: 'app-timeslots-day',
  templateUrl: './timeslots-day.component.html',
  styleUrls: ['./timeslots-day.component.css']
})
export class TimeslotsDayComponent implements OnInit, OnChanges { //

  @Input() day: any;
  @Input() upgradeId: string | undefined;
  dayName!: string;
  itemss: any[] = [];
  hours: any;
  selected: boolean = false;
  showTimeSlots = true;
  selectedTimeSlotId = undefined;
  selectedTimeSlotTime: any;
  visable: boolean = true;

  constructor(  private _timeSlotService: TimeSlotService ) { }

  ngOnInit(): void {

  }

  setClasses() {
    let classes = {
      day: true,
      selected: this.selected,
      removed: !this.visable,
    }
    return classes;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.day && changes.day.currentValue)
      this.day = changes.day.currentValue;
      console.log("on change call from days", this.day);
      this.dayName = this.getDayName(this.day);
  }

  get12HourTime(data: any) {
    if (data > 12)
      return ' PM';
    return ' AM';
  }

  getDayName(date:any){
    console.log("date: ", date.date);
    let day: string;
    switch (getDay(parseISO(date.date))) {
      case 0:
        day = "Søndag";
        break;
      case 1:
        day = "Mandag";
        break;
      case 2:
         day = "Tirsdag";
        break;
      case 3:
        day = "Onsdag";
        break;
      case 4:
        day = "Torsdag";
        break;
      case 5:
        day = "Fredag";
        break;
      case 6:
        day = "Lørdag";
    }
    console.log( day);
    return day;
  }


  selectedTime(data: any) {
    this.selectedTimeSlotTime = data;
  }


  deleteDayTimeSlots(date: any) {
    let obj = {
      "date": date
    };
    this._timeSlotService.deleteDayTimeSlots(obj).subscribe(result => {
    this.visable = false;
    });
  }

  deleteTimeSlot(date: any, timeSlot: any, index: number) {

    let obj = {
      "date": date,
      "startTime": timeSlot.startTime,
      "endTime": timeSlot.endTime
    };

    this._timeSlotService.deleteTimeSlot(obj).subscribe((result: any) => {
      timeSlot.slots--;
    })
  }

 addTimeSlot(date: any, timeSlot: any, index: number) {

    let obj = {
      "date": date,
      "startTime": timeSlot.startTime,
      "endTime": timeSlot.endTime
    };

    this._timeSlotService.addTimeSlot(obj).subscribe((result: any) => {
      timeSlot.slots++;
    })
  }




}