import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerUrl: string = environment.apiEndpoint + "/api/customers/";
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    //this.headers = new HttpHeaders();
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json')
  }

  getCustomers() {
    return this.http.get(this.customerUrl)
  }

  saveAppointments(data: any) {
    let url = environment.apiEndpoint + '/api/customers/save-appointments'
    return this.http.post(url, this.customerUrl, { headers: this.headers })
  }

}
