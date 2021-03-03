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

  saveTimeSlots(data: any) {
    return this.http.post(`${this.timeSlotsUrl}SaveTimeSlots`, data, { headers: this.headers });
  }

  deleteTimeSlot(data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        "day": data.date,
        "startTime": data.startTime,
        "endTime": data.endTime,
      },
    };
    return this.http.delete(`${this.timeSlotsUrl}timegroup`, options)
  }

  deleteDayTimeSlots(data: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: new Date(data.date)
    };
    return this.http.delete(`${this.timeSlotsUrl}${data.upgradeId}/day`, options)
  }


}
