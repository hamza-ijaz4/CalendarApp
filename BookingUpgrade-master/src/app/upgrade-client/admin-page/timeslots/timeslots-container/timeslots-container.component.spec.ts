import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotsContainerComponent } from './timeslots-container.component';

describe('TimeslotsContainerComponent', () => {
  let component: TimeslotsContainerComponent;
  let fixture: ComponentFixture<TimeslotsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeslotsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
