import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UpgradeService {

  baseUrl = environment.apiEndpoint;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true')
  }

  getUpgrades() {
    return this.http.get(this.baseUrl + '/api/upgrade')
  }

  downloadUpgradeFile(upgradeId: string) {
    let url = this.baseUrl + '/api/upgrade/GetUpgradeFile?upgradeId=' + upgradeId;
    return this.http
      .request(
        new HttpRequest("GET", url, null, {
          reportProgress: true,
          responseType: "blob",
        })
      )
  }


}

// getUpgrades(){
//   return this.http.get(this.upgradesUrl,{ headers: new HttpHeaders({  // get<Upgrades[]>(this.upgradesUrl);
//     'Content-Type': 'application/json'
//   } )})
// }
