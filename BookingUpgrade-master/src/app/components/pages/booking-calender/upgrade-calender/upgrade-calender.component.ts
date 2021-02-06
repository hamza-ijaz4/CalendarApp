import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-upgrade-calender',
  templateUrl: './upgrade-calender.component.html',
  styleUrls: ['./upgrade-calender.component.css']
})
export class UpgradeCalenderComponent implements OnInit, OnChanges { //

  upgradeCalenderDaysArray: any;
  appointments: any[] =[];
  //appointments!: Appointment[];
  @Input() upgradeVersion: string = "";


  constructor(private appointmentService:AppointmentService ) { }

  ngOnInit(): void {

    //this.appointments= this.appointmentService.getAppointments();

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.upgradeCalenderDaysArray.currentValue){
      this.upgradeCalenderDaysArray = changes.upgradeCalenderDaysArray.currentValue;
    }

  }

  //will be called by by change in dropdown in 
  getAppointmentDaysByUpgradeVersioOperation(version : string){
    this.appointmentService.getAppointments().subscribe((result:any) =>{
      this.appointments = result;
      console.log("up", this.upgradeVersion)
      this.upgradeCalenderDaysArray = this.getAppointmentsDayArray();
      console.log(this.upgradeCalenderDaysArray)
    
    })
  }

  getAppointmentsDayArray(){
      return this.appointments.reduce(function (dayArray, el) {
        dayArray[el.date] = dayArray[el.date] || [];
        dayArray[el.date].push(el);
        return dayArray;
    }, []);



}

// kalender henter dagens dato
// genererer antall daycomponents med 7 på hver linje (med mindre en viss størrelse)
// kalender fetcher slots fra den gitte måneden
// oppretter groups array basert på tidspunkt, genererer html for goups og slots

