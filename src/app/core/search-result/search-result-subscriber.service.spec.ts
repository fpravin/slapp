import { TestBed } from '@angular/core/testing';

import { SearchResultSubscriberService } from './search-result-subscriber.service';

describe('SearchResultSubscriberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchResultSubscriberService = TestBed.get(SearchResultSubscriberService);
    expect(service).toBeTruthy();
  });
});
