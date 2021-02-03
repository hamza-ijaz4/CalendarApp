import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';
import { FetchAppointmentsService } from 'src/app/services/fetch-appointments.service';

@Component({
  selector: 'app-upgrade-calender',
  templateUrl: './upgrade-calender.component.html',
  styleUrls: ['./upgrade-calender.component.css']
})
export class UpgradeCalenderComponent implements OnInit, OnChanges {

  //appointments!: Appointment[];
  @Input() appointments: any[] = [];


  constructor(private appointmentService: FetchAppointmentsService) { }

  ngOnInit(): void {

    //this.appointments= this.appointmentService.getAppointments();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appointments.currentValue)
      this.appointments = changes.appointments.currentValue;
  }

  buildMonth() { }
}

// kalender henter dagens dato
// genererer antall daycomponents med 7 på hver linje (med mindre en viss størrelse)
// kalender fetcher slots fra den gitte måneden
// oppretter groups array basert på tidspunkt, genererer html for goups og slots

