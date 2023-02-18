import { TestBed } from '@angular/core/testing';

import { YtbApiService } from './ytb-api.service';

describe('YtbApiService', () => {
  let service: YtbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
