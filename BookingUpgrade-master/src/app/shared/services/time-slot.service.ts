import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable()
export class TimeSlotService {

  timeSlotsUrl: string = environment.apiEndpoint + "/api/TimeSlots/";

  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true') //necessary? Json?
  }


  getTimeSlotDays() {
    return this.http.get(`${this.timeSlotsUrl}days`)
  }


  //Used by timeslot generator
  createMultipleTimeSlots(data: any) {
    return this.http.post(`${this.timeSlotsUrl}multiple`, data, { headers: this.headers });
  }


  //Used by minus button
  deleteTimeSlot(data: any) {

    console.log("data from delete:", data)
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "date": data.date,
        "startTime": data.startTime,
        "endTime": data.endTime,
      },
    };
    return this.http.delete(`${this.timeSlotsUrl}single`, options)
  }

  //Used by minus button
  addTimeSlot(data: any) {
    return this.http.post(`${this.timeSlotsUrl}single`, data, { headers: this.headers });
  }

  deleteDayTimeSlots(data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: new Date(data.date)
    };
    console.log(options);
    return this.http.delete(`${this.timeSlotsUrl}day`, options)
  }


}
