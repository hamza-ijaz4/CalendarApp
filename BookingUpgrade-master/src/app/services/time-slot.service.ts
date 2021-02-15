import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  // upgradesUrl: string = environment.apiEndpoint + "/api/TimeSlots/GetTimeSlots";
  upgradesUrl: string = environment.apiEndpoint + "/api/appointment/getappointments";

  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true') //necessary? Json?
  }

  getTimeSlotDays() {
    return this.http.get(this.upgradesUrl)
  }

  getTimeSlotDaysByUpgradeId(UpgradeId: string) {
    return this.http.get(`${this.upgradesUrl}?upgradeId=${UpgradeId}`)
  }
}
