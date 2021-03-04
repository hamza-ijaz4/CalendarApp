import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UpgradeService {

  baseUrl = environment.apiEndpoint + "/api/upgrade";
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true')
  }

  getUpgrades() {
    return this.http.get(this.baseUrl)
  }

  downloadUpgradeFile(upgradeId: string) {
    let url = this.baseUrl + '/?upgradeId=' + upgradeId+'/file';
    return this.http
      .request(
        new HttpRequest("GET", url, null, {
          reportProgress: true,
          responseType: "blob",
        })
      )
  }

  addUpgrade(formData: any){
    return this.http.post(this.baseUrl, formData, { headers: this.headers })
  }

}
