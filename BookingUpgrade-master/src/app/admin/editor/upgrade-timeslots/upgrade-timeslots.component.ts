import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

 //In use, remove??
@Component({
  selector: 'app-upgrade-main',
  template: '<p>template works</p>',
  //templateUrl: './upgrade-timeslots.component.html',
  //styleUrls: ['./upgrade-timeslots.component.css']
})
export class UpgradeMainComponent implements OnInit {

  upgradeId = '';

  constructor(private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    let self = this;
    this._activatedRoute.queryParams
      .subscribe(params => {
        if (params.upgradeId) {
          this.upgradeId = params.upgradeId;
          console.log(params);
        }
      });
  }

}
