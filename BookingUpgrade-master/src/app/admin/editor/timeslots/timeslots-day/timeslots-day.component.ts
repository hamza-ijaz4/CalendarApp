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

  constructor(private httpClient: HttpClient,
    private _timeSlotService: TimeSlotService,
  ) { }

  //   window.location.href.indexOf('admin') > 0 ? this.isAdmin = true : this.isAdmin = false;
  ngOnInit(): void {

  }

  setClasses() {
    let classes = {
      day: true,
      selected: this.selected
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

  saveBooking(day: any) {

    if (!this.selectedTimeSlotTime)
      return;

    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json')

    let url = environment.apiEndpoint;
    url = url + "/api/booking";
    const booking: BookingDto = {
      day: day,
      time: this.selectedTimeSlotTime.hours,
      herId: "23f832ce-72e7-4c30-8aac-04271489cfb7"
    };
    this.httpClient.post(url, booking, { headers: _headers }).subscribe(result => {
      window.location.href = 'http://localhost:4200/';
    })
  }

  DeleteDayTimeSlots(date: any) {
    let obj = {
      "upgradeId": this.upgradeId,
      "date": date
    };
    this._timeSlotService.deleteDayTimeSlots(obj).subscribe(result => {

    });
  }

  deleteTimeSlot(date: any, timeSlot: any, index: number) {

    let obj = {
      "upgradeId": this.upgradeId,
      "date": date,
      "startTime": timeSlot.startTime,
      "endTime": timeSlot.endTime
    };

    this._timeSlotService.deleteTimeSlot(obj).subscribe((result: any) => {
    })
  }




}
