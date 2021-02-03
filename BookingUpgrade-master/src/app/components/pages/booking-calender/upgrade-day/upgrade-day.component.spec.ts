import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeDayComponent } from './upgrade-day.component';

describe('UpgradeDayComponent', () => {
  let component: UpgradeDayComponent;
  let fixture: ComponentFixture<UpgradeDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
