import { TestBed } from '@angular/core/testing';

import { YtbMusicDownloadService } from './ytb-music-download.service';

describe('YtbMusicDownloadService', () => {
  let service: YtbMusicDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtbMusicDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
