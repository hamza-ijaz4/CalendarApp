import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeCalenderComponent } from './upgrade-calender.component';

describe('UpgradeCalenderComponent', () => {
  let component: UpgradeCalenderComponent;
  let fixture: ComponentFixture<UpgradeCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeCalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
