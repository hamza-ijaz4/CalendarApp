import { environment } from '../../../environments/environment';
import { Time } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/Appointment';
import { EmitEvent, EventBusService } from 'src/app/shared/services/event-bus-service';

@Component({
  selector: 'app-setup-form',
  templateUrl: './add-upgrade.component.html',
  styleUrls: ['./add-upgrade.component.css']
})
export class AddUpgradeComponent implements OnInit {


  // @ViewChild(SetTimeComponent) child:SetTimeComponent;

  upgradeVersion!: string;
  startDate!: any;
  endDate!: Date;
  upgradeHoursPerDay!: number;
  duration!: string;
  upgradeHours: Time[] = [];

  appointments: Appointment[] = [];
  shortDescription = '';
  fileToUpload: any;


  constructor(private httpClient: HttpClient,
    private eventbus: EventBusService,) { }

  ngOnInit(): void {
    this.eventbus.emit(new EmitEvent('hideUpgrade', null));
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
    formData.append('version', this.upgradeVersion);
    formData.append('description', this.shortDescription);
    formData.append('durationMin', this.duration);

    let url = environment.apiEndpoint;
    url = url + "/api/upgrade";

    this.httpClient.post(url, formData, { headers: _headers }).subscribe(() => {
      window.location.href = 'http://localhost:4200/'
    })

  }

  appendTime() {
    console.log("add time");
  }
}

