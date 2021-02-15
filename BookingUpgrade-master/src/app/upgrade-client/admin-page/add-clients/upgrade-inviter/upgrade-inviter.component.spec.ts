import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeInviterComponent } from './upgrade-inviter.component';

describe('UpgradeInviterComponent', () => {
  let component: UpgradeInviterComponent;
  let fixture: ComponentFixture<UpgradeInviterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeInviterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeInviterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
