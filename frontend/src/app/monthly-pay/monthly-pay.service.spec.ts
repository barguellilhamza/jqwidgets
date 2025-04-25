import { TestBed } from '@angular/core/testing';

import { MonthlyPayService } from './monthly-pay.service';

describe('MonthlyPayService', () => {
  let service: MonthlyPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
