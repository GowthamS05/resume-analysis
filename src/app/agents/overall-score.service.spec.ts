import { TestBed } from '@angular/core/testing';

import { OverallScoreService } from './overall-score.service';

describe('OverallScoreService', () => {
  let service: OverallScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverallScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
