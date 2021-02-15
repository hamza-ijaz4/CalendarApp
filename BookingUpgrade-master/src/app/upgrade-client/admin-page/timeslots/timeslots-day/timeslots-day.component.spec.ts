import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotsDayComponent } from './timeslots-day.component';

describe('TimeslotsDayComponent', () => {
  let component: TimeslotsDayComponent;
  let fixture: ComponentFixture<TimeslotsDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotsDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
