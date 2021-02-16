import { Time } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-set-time',
  templateUrl: './set-time.component.html',
  styleUrls: ['./set-time.component.css']
})
export class SetTimeComponent implements OnInit {

  @Input() upgradeHours!: Time[];
  timeStart!: Time;


  constructor() { }

  ngOnInit(): void {
  }

  // setTime(){
  //   this.upgradeHours.push(this.timeStart);
  // }



}
