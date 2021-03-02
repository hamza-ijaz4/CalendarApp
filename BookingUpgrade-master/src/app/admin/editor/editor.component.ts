import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UpgradeService } from 'src/app/shared/services/upgrade.service';
import { SaveTimeSlotsComponent } from './timeslots/save-timeslots/save-timeslots.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  upgrades: any[] = [];
  upgradeId!: string;

  @ViewChild('createTimeSlot', { static: true }) createTimeSlot!: SaveTimeSlotsComponent;

  constructor(private upgradeService: UpgradeService,) {
  }

  ngOnInit(): void {
    this.getUpgrades();
  }

  getUpgrades() {
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

  showDialog() {
    this.createTimeSlot.show();
  }


}
