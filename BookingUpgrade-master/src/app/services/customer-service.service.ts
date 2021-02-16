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

  getCustomers(upgradeId: string) {
    return this.http.get(`${this.customerUrl}${upgradeId}/list`)
  }

  saveAppointments(data: any) {
    let obj = {
      "herId": data.herId
    }
    return this.http.post(`this.customerUrl${data.upgradeId}&${data.herId}/save`, obj, { headers: this.headers })
  }

}
