import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  upgradesUrl : string =  'https://localhost:44322/api/appointments';
  headers : HttpHeaders;

  constructor(private http:HttpClient) { 

    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true') //necessary? Json?

  }

  getAppointments(){
    return this.http.get(this.upgradesUrl) 
  }
}
