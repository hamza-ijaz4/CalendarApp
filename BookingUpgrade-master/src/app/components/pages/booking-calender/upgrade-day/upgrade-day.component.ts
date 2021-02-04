import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';

export interface BookingDto {
  appointmentId: number | undefined;
  herId: number | undefined;
  id: number | undefined;
}

@Component({
  selector: 'app-upgrade-day',
  templateUrl: './upgrade-day.component.html',
  styleUrls: ['./upgrade-day.component.css']
})

export class UpgradeDayComponent implements OnInit, OnChanges {

  @Input() appointment: any;
  hours: any;
  selected: boolean = false;
  showAppointments = false;
  selectedAppointmentId = undefined;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {

    //this.hours= this.appointment.hour
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appointment.currentValue)
      this.appointment = changes.appointment.currentValue;
  }

  setClasses() {
    let classes = {
      day: true,
      selected: this.selected
    }
    return classes;
  }

  change(event: any) {
    this.selectedAppointmentId = event.target.value;
  }

  saveBooking() {

    if (!this.selectedAppointmentId)
      return;

    let _headers = new HttpHeaders();
    _headers.append('Access-Control-Allow-Credentials', 'true')
    _headers.append('Content-Type', 'application/json')

    let url = 'https://localhost:44332';
    url = url + "/api/booking";

    const booking: BookingDto = {
      appointmentId: Number(this.selectedAppointmentId),
      herId: 0,
      id: 1
    }

    this.httpClient.post(url, booking, { headers: _headers }).subscribe(result => {
      window.location.reload();
    })
  }




}
