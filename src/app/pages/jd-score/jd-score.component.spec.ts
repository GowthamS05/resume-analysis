import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JdScoreComponent } from './jd-score.component';

describe('JdScoreComponent', () => {
  let component: JdScoreComponent;
  let fixture: ComponentFixture<JdScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JdScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JdScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
