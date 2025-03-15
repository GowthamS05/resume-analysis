import { TestBed } from '@angular/core/testing';

import { JDMatchService } from './jd-score.service';

describe('JDMatchService', () => {
  let service: JDMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JDMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
