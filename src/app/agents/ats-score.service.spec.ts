import { TestBed } from '@angular/core/testing';

import { ATSScoreService } from './ats-score.service';

describe('AtsScoreService', () => {
  let service: ATSScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ATSScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
