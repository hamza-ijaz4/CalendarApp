
import { UpgradeService } from 'src/app/services/upgrade.service';
import { Component, OnInit } from '@angular/core';

import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-booking-main',
  templateUrl: './booking-main.component.html',
  styleUrls: ['./booking-main.component.css']
})
export class BookingMainComponent implements OnInit {

  upgrades: any[] = [];
  upgradeId!: string;
  constructor(private upgradeService: UpgradeService) { }


  ngOnInit(): void {

    this.upgradeService.getUpgrades().subscribe((result: any) => {
      this.upgrades = result;
    })
  }

  downloadFile() {
    if (!this.upgradeId)
      return;
    this.upgradeService.downloadUpgradeFile(this.upgradeId).subscribe((data: any) => {
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


}
