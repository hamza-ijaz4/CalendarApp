import { appointments } from './../../models/CreateAppointmentDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppointmentService {
  bookingUrl: string = environment.apiEndpoint + "/api/booking";
  appontmentUrl: string = environment.apiEndpoint + "/api/Appointments";

  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true') //necessary? Json?
  }


  getBookedAppointments(){
    return this.http.get(this.appontmentUrl+"/active")

  }

  getAppointments(){
    return this.http.get(this.appontmentUrl)
  }

  completeAppointment(appointmentId:string){
    //update current version
    return this.http.patch(this.appontmentUrl+"/status",  {Id :appointmentId, status: 2}, { headers: this.headers })

  }

  cancelAppointment(appointmentId:string){
    return this.http.patch(this.appontmentUrl+"/status",  {Id :appointmentId, status: 3}, { headers: this.headers })

  }

  getHistoricAppointments(){
    //return this.http.get(this.appontmentUrl+"/booked")
    return this.http.get(this.appontmentUrl+ "/historic")
  }

  updateAppointment(data: any) {
    console.log("data", data)
    return this.http.post(`${this.bookingUrl}/updateinvites`, data, { headers: this.headers })
  }
}
