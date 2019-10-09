import { TestBed } from '@angular/core/testing';

import { CareerAsyncService } from './career-async.service';

describe('CareerAsyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CareerAsyncService = TestBed.get(CareerAsyncService);
    expect(service).toBeTruthy();
  });
});
