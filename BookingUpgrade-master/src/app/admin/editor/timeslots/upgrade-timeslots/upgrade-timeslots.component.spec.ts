import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeTimeslotsComponent } from './upgrade-timeslots.component';

describe('UpgradeTimeslotsComponent', () => {
  let component: UpgradeTimeslotsComponent;
  let fixture: ComponentFixture<UpgradeTimeslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeTimeslotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
