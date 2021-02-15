import { environment } from '../../../../../environments/environment';
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



    let timeGroups = [];
    if (this.upgradeHoursPerDay > 0) {
      timeGroups.push({ "startTime": this.timeStart1, "slots": this.slotsTime1 });
    }
    if (this.upgradeHoursPerDay > 1) {
      timeGroups.push({ "startTime": this.timeStart2, "slots": this.slotsTime2 });
    }
    if (this.upgradeHoursPerDay > 2) {
      timeGroups.push({ "startTime": this.timeStart3, "slots": this.slotsTime3 });
    }
    if (this.upgradeHoursPerDay > 3) {
      timeGroups.push({ "startTime": this.timeStart4, "slots": this.slotsTime4 });
    }
    if (this.upgradeHoursPerDay > 4) {
      timeGroups.push({ "startTime": this.timeStart5, "slots": this.slotsTime5 });
    }

    let timeGroupsJson = JSON.stringify(timeGroups);
    formData.append('version', this.upgradeVersion);
    formData.append('description', this.shortDescription);
    formData.append('durationMin', this.duration);
    formData.append('endDate', this.endDate.toString());
    formData.append('startDate', this.startDate.toString());
    formData.append('timeGroupsJson', timeGroupsJson);
    //formData.append('appointmnetsJson', appointmentJson);


    let url = environment.apiEndpoint;
    url = url + "/api/upgrades";

    this.httpClient.post(url, formData, { headers: _headers }).subscribe(result => {
      console.log(result)
      window.location.href = 'http://localhost:4200/'
    })

  }

  // setEndTime(startTime: any) {
  //   let str = startTime.toString();
  //   let _str = str.split(':')[1];
  //   let numb = Number(_str) + Number(this.duration);
  //   return str.split(':')[0] + ':' + numb;

  // }


  appendTime() {
    console.log("add time");
  }
}
