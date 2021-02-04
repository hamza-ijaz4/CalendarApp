import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { format, addDays, differenceInDays } from 'date-fns'
import { Appointment } from 'src/app/models/Appointment';
import { createAppointmentDto } from 'src/app/models/CreateAppointmentDto';
import { appointments } from 'src/app/models/CreateAppointmentDto';

@Component({
  selector: 'app-setup-form',
  templateUrl: './setup-form.component.html',
  styleUrls: ['./setup-form.component.css']
})
export class SetupFormComponent implements OnInit {


  // @ViewChild(SetTimeComponent) child:SetTimeComponent;

  upgradeVersion!: string;
  startDate!: any;
  endDate!: Date;
  upgradeHoursPerDay!: number;
  duration!: string;
  upgradeHours: Time[] = [];
  timeStart1!: Time;
  timeStart2!: Time;
  timeStart3!: Time;
  timeStart4!: Time;
  timeStart5!: Time;
  slotsTime1!: number;
  slotsTime2!: number;
  slotsTime3!: number;
  slotsTime4!: number;
  slotsTime5!: number;
  appointments: Appointment[] = [];
  shortDescription = '';
  fileToUpload: any;


  constructor(private httpClient: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.onSubmit;
  }

  handleFileInput(event: any) {
    if (event) {
      this.fileToUpload = event.target.files.item(0);
    }
  }

  onSubmit() {

    let _headers = new HttpHeaders();
    _headers.append('Access-Control-Allow-Credentials', 'true')

    const formData: FormData = new FormData();
    if (this.fileToUpload) {
      formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
    }



    let appointments = [];
    if (this.upgradeHoursPerDay > 0) {
      appointments.push({ "startTime": this.timeStart1, "endTime": this.setEndTime(this.timeStart1), "slots": this.slotsTime1 });
    }
    if (this.upgradeHoursPerDay > 1) {
      appointments.push({ "startTime": this.timeStart1, "endTime": this.setEndTime(this.timeStart2), "slots": this.slotsTime2 });
    }
    if (this.upgradeHoursPerDay > 2) {
      appointments.push({ "startTime": this.timeStart1, "endTime": this.setEndTime(this.timeStart3), "slots": this.slotsTime3 });
    }
    if (this.upgradeHoursPerDay > 3) {
      appointments.push({ "startTime": this.timeStart1, "endTime": this.setEndTime(this.timeStart4), "slots": this.slotsTime4 });
    }
    if (this.upgradeHoursPerDay > 4) {
      appointments.push({ "startTime": this.timeStart1, "endTime": this.setEndTime(this.timeStart4), "slots": this.slotsTime5 });
    }

    let appointmentJson = JSON.stringify(appointments);
    formData.append('title', this.upgradeVersion);
    formData.append('description', this.shortDescription);
    formData.append('duration', this.duration);
    formData.append('endDate', this.endDate.toString());
    formData.append('startDate', this.startDate.toString());
    formData.append('appointmnetsJson', appointmentJson);


    let url = 'https://localhost:44332';
    url = url + "/api/appointment";

    this.httpClient.post(url, formData, { headers: _headers }).subscribe(result => {
      window.location.href = 'http://localhost:4200/'
    })


    /*
    this.startDate = new Date(this.startDate);
    this.endDate = new Date(this.endDate);
    let diffOfDays = differenceInDays(this.endDate, this.startDate);
    console.log("upgradeHours", this.upgradeHours);
    this.upgradeHours = [this.timeStart1, this.timeStart2, this.timeStart3, this.timeStart4, this.timeStart5]

    // for(let d = 0; d<= diffOfDays; d++){
    //   for(let h = 0; h<this.upgradeHoursPerDay; h++){


    //     let dato = format(addDays(this.startDate, d), "dd/MM/yyyy");
    //     let newAppointment: Appointment =
    //       {
    //         versionNumber: this.upgradeVersion,
    //         date : dato,
    //         hour: this.upgradeHours[h].toString(),
    //         durationMin: this.duration,
    //         available:true,
    //         executed: false
    //       }

    //       console.log(newAppointment);
    //       this.appointments.push(newAppointment)
    //     }
    //   }
    console.log(this.appointments);
    */
  }

  setEndTime(startTime: any) {
    let str = startTime.toString();
    let _str = str.split(':')[1];
    let numb = Number(_str) + Number(this.duration);
    return str.split(':')[0] + ':' + numb;

  }


  appendTime() {
    console.log("add time");
  }
}
