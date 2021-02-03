import { Component, OnInit } from '@angular/core';
import { UpgradeSlot } from 'src/app/models/UpgradeSlot';

@Component({
  selector: 'app-upgrade-group',
  templateUrl: './upgrade-group.component.html',
  styleUrls: ['./upgrade-group.component.css']
})
export class UpgradeGroupComponent implements OnInit {

  upgradeSlots!:UpgradeSlot[]; //Todo add and handle undefined

  constructor() { }

  ngOnInit(): void {

  }

}
