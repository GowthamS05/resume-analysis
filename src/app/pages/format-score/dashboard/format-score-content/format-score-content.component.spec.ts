import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatScoreContentComponent } from './format-score-content.component';

describe('FormatScoreContentComponent', () => {
  let component: FormatScoreContentComponent;
  let fixture: ComponentFixture<FormatScoreContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatScoreContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatScoreContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
