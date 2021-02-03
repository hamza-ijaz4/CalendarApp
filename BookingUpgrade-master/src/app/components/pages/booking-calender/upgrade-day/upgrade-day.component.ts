import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';

@Component({
  selector: 'app-upgrade-day',
  templateUrl: './upgrade-day.component.html',
  styleUrls: ['./upgrade-day.component.css']
})
export class UpgradeDayComponent implements OnInit, OnChanges {

  @Input() appointment: any;
  hours: any;
  selected: boolean = false;

  constructor() { }

  ngOnInit(): void {

    //this.hours= this.appointment.hour
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appointment.currentValue)
      this.appointment = changes.appointment.currentValue;
  }

  setClasses() {
    let classes = {
      day: true,
      selected: this.selected
    }
    return classes;
  }



}
