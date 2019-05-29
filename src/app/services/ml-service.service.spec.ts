import { TestBed } from '@angular/core/testing';

import { MlServiceService } from './ml-service.service';

describe('MlServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MlServiceService = TestBed.get(MlServiceService);
    expect(service).toBeTruthy();
  });
});
