import { TestBed } from '@angular/core/testing';

import { LocationDetailService } from './location-detail.service';

describe('LocationDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationDetailService = TestBed.get(LocationDetailService);
    expect(service).toBeTruthy();
  });
});
