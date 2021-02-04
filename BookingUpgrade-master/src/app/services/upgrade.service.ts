import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpgradeService {

  upgradesUrl : string =  'https://localhost:44322/api/upgrades';
  headers : HttpHeaders;

  constructor(private http:HttpClient) { 

    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true')

  }

  getUpgrades(){
    return this.http.get(this.upgradesUrl,{ headers: new HttpHeaders({
      'Content-Type': 'application/json' 
    } )})  // get<Upgrades[]>(this.upgradesUrl);
  }
}
