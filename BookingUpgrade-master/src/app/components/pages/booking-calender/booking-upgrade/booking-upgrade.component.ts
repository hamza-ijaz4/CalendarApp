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

  upgradeCalenderDaysArray: any;
  upgrades: any[] = [];
  appointments: any[] =[];
  upgradeId = undefined;
  constructor(
    private httpClient: HttpClient, 
    private upgradeService: UpgradeService, 
    private appointmentService:AppointmentService) { }


  ngOnInit(): void {

    this.upgradeService.getUpgrades().subscribe((result:any) =>{
    this.upgrades = result;

    //get appontments for latest upgrade

    })

   // this.getUpgrades();
   // this.getAppointments();
  }


  getAllAppointments(){
    this.appointmentService.getAppointments().subscribe((result:any) =>{
      this.appointments = result;
      console.log("up", this.upgrades)
      this.upgradeCalenderDaysArray = this.getAppointmentsDayArray();
      console.log(this.upgradeCalenderDaysArray)
   
  })
}
  getAppointmentsDayArray(){
      return this.appointments.reduce(function (dayArray, el) {
        dayArray[el.date] = dayArray[el.date] || [];
        dayArray[el.date].push(el);
        return dayArray;
    }, []);
  }
 





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

  getUpgrades() {
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
