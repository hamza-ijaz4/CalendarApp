import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomerService {

  upgradeUrl = environment.apiEndpoint + "/api/upgrade/"
  customerUrl: string = environment.apiEndpoint + "/api/customers/";
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json')
  }


  getCustomers() {
    return this.http.get(`${this.customerUrl}status`);
  }




}
