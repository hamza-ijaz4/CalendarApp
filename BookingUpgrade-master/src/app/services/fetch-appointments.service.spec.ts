import { TestBed } from '@angular/core/testing';

import { FetchAppointmentsService } from './fetch-appointments.service';

describe('FetchAppointmentsService', () => {
  let service: FetchAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
