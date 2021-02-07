import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  upgradesUrl : string =  'https://localhost:44332/api/getAppointment/';
  headers : HttpHeaders;

  constructor(private http:HttpClient) { 

    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true') //necessary? Json?

  }

  getAppointmentDays(){
    return this.http.get(this.upgradesUrl) 
  }

  getAppointmentDaysByUpgradeId(UpgradeId: string){
    return this.http.get(`this.appointmentUrl+ ${UpgradeId}`) 
  }

}
