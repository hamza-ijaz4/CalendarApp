import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';


@Component({
  selector: 'app-upgrade-calender',
  templateUrl: './upgrade-calender.component.html',
  styleUrls: ['./upgrade-calender.component.css']
})
export class UpgradeCalenderComponent implements OnInit, OnChanges { //

  //appointments!: Appointment[];
  @Input() daysArray: any[] = [];


  constructor() { }

  ngOnInit(): void {

    //this.appointments= this.appointmentService.getAppointments();

  }

  ngOnChanges(changes: SimpleChanges) {

    
    if (changes.daysArray.currentValue)
      this.daysArray = changes.daysArray.currentValue;
  }

  buildMonth() { }
}

// kalender henter dagens dato
// genererer antall daycomponents med 7 på hver linje (med mindre en viss størrelse)
// kalender fetcher slots fra den gitte måneden
// oppretter groups array basert på tidspunkt, genererer html for goups og slots

