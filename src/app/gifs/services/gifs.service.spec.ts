import { TestBed } from '@angular/core/testing';

import { GifsService } from './gifs.service';

describe('GifsServiceService', () => {
  let service: GifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
