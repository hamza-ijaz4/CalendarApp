import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Scroll, } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EmitEvent, EventBusService } from '../services/event-bus-service';
import { UpgradeService } from '../services/upgrade.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  showUpgradeDrpDwn = false;
  constructor(private upgradeService: UpgradeService,
    private eventbus: EventBusService,
    private _router: Router) {
  }

  upgrades: any[] = [];
  upgradeId!: string;

  ngOnInit(): void {
    this.getUpgrades();
    this._router.events.subscribe(result => {
      this.showUpgradeDrpDwn = true;
    })

    this.eventbus.on('hideUpgrade', ((event: any) => {
      this.showUpgradeDrpDwn = false;
    }))

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

  getTimeSlots() {
    this.eventbus.emit(new EmitEvent('getTimeSlots', this.upgradeId));
  }

  redirect(route: string) {
    this._router.navigate([route], { queryParams: { upgradeId: this.upgradeId || '' } });
  }



}
