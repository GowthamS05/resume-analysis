import { TestBed } from '@angular/core/testing';

import { ResumeFormatService } from './format-score.service';

describe('ResumeFormatService', () => {
  let service: ResumeFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
