import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDaysComponent } from './booking-days.component';

describe('BookingDaysComponent', () => {
  let component: BookingDaysComponent;
  let fixture: ComponentFixture<BookingDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
