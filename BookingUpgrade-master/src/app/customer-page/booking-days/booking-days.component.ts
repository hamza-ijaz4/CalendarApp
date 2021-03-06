
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { EventBusService } from 'src/app/shared/services/event-bus-service';
import { getDay, parseISO } from 'date-fns'

export interface BookingDto {
  day: any,
  StartTime: any,
  AppointmentId: string,
}

@Component({
  selector: 'app-booking-days',
  templateUrl: './booking-days.component.html',
  styleUrls: ['./booking-days.component.css']
})
export class BookingDaysComponent implements OnInit, OnChanges { //

  @Input() day: any;
  @Input() upgradeId: string | undefined;
  items: any[] = [];
  hours: any;
  dayName!: string;
  selected: boolean = false;
  showTimeSlots = true;
  selectedTimeSlotId = undefined;
  selectedTimeSlotTime: any;
  appointmentId: string = "";


  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // window.location.href.indexOf('admin') > 0 ? this.isAdmin = true : this.isAdmin = false;
    let appointmentQuery = this.route.snapshot.paramMap.get('appointmentId');
    this.appointmentId += appointmentQuery;

  }

  setClasses() {
    let classes = {
      day: true,
      selected: this.selected
    }
    return classes;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.day.currentValue)
      this.day = changes.day.currentValue;
      this.dayName = this.getDayName(this.day);

  }

  get12HourTime(data: any) {
    if (data > 12)
      return ' PM';
    return ' AM';
  }



  getDayName(date:any){
    console.log("date: ", date.date);
    let day: string;
    switch (getDay(parseISO(date.date))) {
      case 0:
        day = "Søndag";
        break;
      case 1:
        day = "Mandag";
        break;
      case 2:
         day = "Tirsdag";
        break;
      case 3:
        day = "Onsdag";
        break;
      case 4:
        day = "Torsdag";
        break;
      case 5:
        day = "Fredag";
        break;
      case 6:
        day = "Lørdag";
    }
    console.log( day);
    return day;
  }


  selectedTime(data: any) {
    this.selectedTimeSlotTime = data;
    console.log(data)
  }




  bookTime(day: any) {

    if (!this.selectedTimeSlotTime)
      return;

    // let _headers = new HttpHeaders();
    // _headers.append('Content-Type', 'application/json')

    // let url = environment.apiEndpoint;
    // url = url + "/api/booking/bookTime";
    const booking: BookingDto = {
      day: day,
      StartTime: this.selectedTimeSlotTime,
      AppointmentId: this.appointmentId

    };

    this.appointmentService.setAppointmentTime(booking).subscribe(result => {
      window.location.href = 'http://localhost:4200/';
    })

  }


}
