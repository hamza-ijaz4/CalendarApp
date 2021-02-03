import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeGroupComponent } from './upgrade-group.component';

describe('UpgradeGroupComponent', () => {
  let component: UpgradeGroupComponent;
  let fixture: ComponentFixture<UpgradeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
