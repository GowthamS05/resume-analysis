import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatScoreComponent } from './format-score.component';

describe('FormatScoreComponent', () => {
  let component: FormatScoreComponent;
  let fixture: ComponentFixture<FormatScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormatScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormatScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
