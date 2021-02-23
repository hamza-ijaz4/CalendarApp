import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmitEvent, EventBusService } from 'src/app/shared/services/event-bus-service';
import { TimeSlotService } from 'src/app/shared/services/time-slot.service';
import { environment } from '../../../environments/environment';

export interface BookingDto {
  day: any,
  StartTime: any,
  AppointmentId: string,
 // upgradeId: string
}

@Component({
  selector: 'app-booking-days',
  templateUrl: './booking-days.component.html',
  styleUrls: ['./booking-days.component.css']
})
export class BookingDaysComponent  implements OnInit, OnChanges { //

  @Input() day: any;
  @Input() upgradeId: string | undefined;
  items: any[] = [];
  hours: any;
  selected: boolean = false;
  showTimeSlots = true;
  selectedTimeSlotId = undefined;
  selectedTimeSlotTime: any;
  appointmentId: string ="";


  constructor(private httpClient: HttpClient,
    private _timeSlotService: TimeSlotService,
    private eventbus: EventBusService, private route: ActivatedRoute) { }

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
    console.log("on change call from days", this.day);

  }

  get12HourTime(data: any) {
    if (data > 12)
      return ' PM';
    return ' AM';
  }

  selectedTime(data: any) {
    this.selectedTimeSlotTime = data;
    console.log(data)
  }

  bookTime(day: any) {

    if (!this.selectedTimeSlotTime)
      return;

    let _headers = new HttpHeaders();
    _headers.append('Content-Type', 'application/json')

    let url = environment.apiEndpoint;
    url = url + "/api/booking/bookTime";
    const booking: BookingDto = {
      day: day,
      StartTime: this.selectedTimeSlotTime,
      AppointmentId: this.appointmentId


    };
    console.log("Selected Timeslot",this.selectedTimeSlotTime, "day", day, "appointmentId " ,this.appointmentId)
    this.httpClient.post(url, booking, { headers: _headers }).subscribe(result => {
      window.location.href = 'http://localhost:4200/';
    })
  }


}
