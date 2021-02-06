import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UpgradeService } from 'src/app/services/upgrade.service';

@Component({
  selector: 'app-booking-upgrade',
  templateUrl: './booking-upgrade.component.html',
  styleUrls: ['./booking-upgrade.component.css']
})
export class BookingUpgradeComponent implements OnInit {

  upgrades: any[] = [];
  upgradeId = undefined;
  constructor(private upgradeService: UpgradeService) { }


  ngOnInit(): void {

    this.upgradeService.getUpgrades().subscribe((result:any) =>{
    this.upgrades = result;


    //get appontments for latest upgrade

    })
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
  getUpgradesOperation( ) {


  //Move to ServicecClass
    let _headers = new HttpHeaders();
    _headers.append('Access-Control-Allow-Credentials', 'true')

    let url = 'https://localhost:44322';
    url = url + "/api/upgrades";
    this.httpClient.get(url, { headers: _headers }).subscribe((resut: any) => {
      this.upgrades = resut;
      console.log("result",resut)
    })
  }

}
