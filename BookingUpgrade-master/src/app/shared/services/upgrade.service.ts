import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UpgradeService {

  upgradeUrl = environment.apiEndpoint + "/api/upgrade/";

  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true')
  }

  getUpgrades() {
    return this.http.get(this.upgradeUrl)
  }

  getUpgradeIdByAppointmentId(appointmentId: string) {
    return this.http.get(this.upgradeUrl + appointmentId + '/appointment')
  }


  downloadUpgradeFile(upgradeId: string) {
    let url = this.upgradeUrl + '?upgradeId=' + upgradeId+'/file';
    return this.http
      .request(
        new HttpRequest("GET", url, null, {
          reportProgress: true,
          responseType: "blob",
        })
      )
  }

  addUpgrade(formData: any){
    return this.http.post(this.upgradeUrl, formData, { headers: this.headers })
  }


  // getUpgradeIdByAppointmentId(appointmentId: string) {
  //   return this.http.get(this.appontmentUrl + appointmentId)
  // }

}


