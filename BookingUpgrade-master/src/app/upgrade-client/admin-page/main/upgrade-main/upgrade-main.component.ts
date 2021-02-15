import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { EventBusService } from 'src/app/services/event-bus-service';
import { UpgradeService } from 'src/app/services/upgrade.service';

@Component({
  selector: 'app-upgrade-main',
  templateUrl: './upgrade-main.component.html',
  styleUrls: ['./upgrade-main.component.css']
})
export class UpgradeMainComponent implements OnInit {

  upgradeId = '';

  constructor(private eventbus: EventBusService, private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    let self = this;
    this.eventbus.on('getTimeSlots', ((event: any) => {
      self.upgradeId = event;
    }))

    this._activatedRoute.queryParams
      .subscribe(params => {
        if (params.upgradeId) {
          this.upgradeId = params.upgradeId;
          console.log(params); // { order: "popular" }
        }

      });
  }



  // this.getUpgrades();
  // this.getAppointments();







  // getAppointments() {
  //   let _headers = new HttpHeaders();
  //   _headers.append('Access-Control-Allow-Credentials', 'true')

  //   let url = 'https://localhost:44322';
  //   url = url + "/api/Appointments";
  //   // if (this.upgradeId) {
  //   //   url = url + "?upgradeid=" + this.upgradeId;
  //   // }
  //   console.log("AppointmentID", this.upgradeId)


  //   this.httpClient.get(url).subscribe((resut: any) => {
  //    // this.items = resut;
  //     console.log(resut);


  //   })
  // }

  //All major classes with call to service will be called ..Operation
  // getUpgradesOperation() {


  //   //Move to ServicecClass
  //   let _headers = new HttpHeaders();
  //   _headers.append('Access-Control-Allow-Credentials', 'true')

  //   let url = 'https://localhost:44322';
  //   url = url + "/api/upgrades";
  //   this._httpClient.get(url, { headers: _headers }).subscribe((resut: any) => {
  //     this.upgrades = resut;
  //     console.log("result", resut)
  //   })
  // }

}
