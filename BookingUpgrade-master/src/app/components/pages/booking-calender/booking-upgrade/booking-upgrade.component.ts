import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
  upgradeId! : string;
  constructor(private upgradeService: UpgradeService) { }


  ngOnInit(): void {

    this.upgradeService.getUpgrades().subscribe((result: any) => {
      this.upgrades = result;
    })
  }

  downloadFile() {
    this.upgradeService.downloadUpgradeFile('23f832ce-72e7-4c30-8aac-04271489cfb7').subscribe((data: any) => {
      if (data.type != 4) {
        return;
      }
      if (!data.body) {

        return;
      } else {

      }
      const blob = new Blob([data.body as Blob], {
        type: data.headers.get("Content-type"),
      });
      const dataURL = window.URL.createObjectURL(blob);
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }

      const link = document.createElement("a");
      link.href = dataURL;
      link.download =
        this.getFileNameFromHttpResponse(data) || 'demoo.png';
      link.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(dataURL);
      }, 100);
      // const blob = new Blob([file], { type: 'png' });
      // const url = window.URL.createObjectURL(blob);
      // window.open(url);
    });
  }

  getFileNameFromHttpResponse(httpResponse: HttpResponse<any>) {
    let contentDispositionHeader = httpResponse.headers.get(
      "Content-Disposition"
    );
    let result =
      (contentDispositionHeader &&
        contentDispositionHeader.split(";")[1].trim().split("=")[1]) ||
      "";
    return result.replace(/"/g, "");
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
