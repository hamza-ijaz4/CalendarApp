import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-upgrade',
  templateUrl: './booking-upgrade.component.html',
  styleUrls: ['./booking-upgrade.component.css']
})
export class BookingUpgradeComponent implements OnInit {

  items: any[] = [];
  upgrades: any[] = [];
  upgradeId = undefined;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    //this.getUpgrades();
    this.getAppointments();
  }

  getAppointments() {
    let _headers = new HttpHeaders();
    _headers.append('Access-Control-Allow-Credentials', 'true')

    let url = 'https://localhost:44322';
    url = url + "/api/UpgradeAppointments";
    if (this.upgradeId) {
      url = url + "?upgradeid=" + this.upgradeId;
    }

    this.httpClient.get(url, { headers: _headers }).subscribe((resut: any) => {
      this.items = resut
    })
  }

  getUpgrades() {
    let _headers = new HttpHeaders();
    _headers.append('Access-Control-Allow-Credentials', 'true')

    let url = 'https://localhost:44332';
    url = url + "/api/upgrade";
    this.httpClient.get(url, { headers: _headers }).subscribe((resut: any) => {
      this.upgrades = resut;
      console.log(resut)
    })
  }

}
