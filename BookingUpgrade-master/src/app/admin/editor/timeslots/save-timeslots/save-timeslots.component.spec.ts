import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTimeslotsComponent } from './save-timeslots.component';

describe('SaveTimeslotsComponent', () => {
  let component: SaveTimeslotsComponent;
  let fixture: ComponentFixture<SaveTimeslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTimeslotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
