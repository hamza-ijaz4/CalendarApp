import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';


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
  hours: any;
  selected: boolean = false;
  showTimeSlots = false;
  selectedTimeSlotId = undefined;
  selectedTimeSlotTime: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

    //this.hours= this.appointment.hour
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.appointment.currentValue)
  //     this.appointment = changes.appointment.currentValue;
  // }

  setClasses() {
    let classes = {
      day: true,
      selected: this.selected
    }
    return classes;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.day.currentValue)
      this.day = changes.day.currentValue;
    console.log("on change call from days", this.day)
    //this.selectedTimeSlotId = event.target.value;
  }

  get12HourTime(data: any) {
    if (data > 12)
      return ' PM';
    return ' AM';
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

  DeleteTimeSlotDays() {
    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json')

    let url = environment.apiEndpoint;
    url = url + "/api/timeslots/delete-timeslot-days?input=" + this.day.date;

    this.httpClient.delete(url, { headers: _headers }).subscribe(result => {
      window.location.href = 'http://localhost:4200/';
    })
  }




}
