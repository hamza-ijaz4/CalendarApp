import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomerService {

  bookingUrl: string = environment.apiEndpoint + "/api/booking/";
  customerUrl: string = environment.apiEndpoint + "/api/customers/";
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    //this.headers = new HttpHeaders();
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json')
  }

  // getCustomersById(upgradeId: string) {
  //   return this.http.get(`${this.customerUrl}list`)
  // }

  getCustomers() {
    return this.http.get(`${this.customerUrl}status`);
  }

  saveAppointments(data: any) {
    return this.http.post(`${this.bookingUrl}bookingInvites`, data, { headers: this.headers })
  }

  getUpgradeIdByAppointmentId(appointmentId: string) {
    return this.http.get(this.bookingUrl + appointmentId)
  }



}
