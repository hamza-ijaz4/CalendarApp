import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTimeslotsComponent } from './booking-timeslots.component';

describe('BookingTimeslotsComponent', () => {
  let component: BookingTimeslotsComponent;
  let fixture: ComponentFixture<BookingTimeslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingTimeslotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
