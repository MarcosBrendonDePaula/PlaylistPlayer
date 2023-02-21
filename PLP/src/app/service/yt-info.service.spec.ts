import { TestBed } from '@angular/core/testing';

import { YtInfoService } from './yt-info.service';

describe('YtInfoService', () => {
  let service: YtInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
