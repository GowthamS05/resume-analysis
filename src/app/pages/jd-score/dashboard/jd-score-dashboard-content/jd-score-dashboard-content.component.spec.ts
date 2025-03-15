import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JdScoreDashboardContentComponent } from './jd-score-dashboard-content.component';

describe('JdScoreDashboardContentComponent', () => {
  let component: JdScoreDashboardContentComponent;
  let fixture: ComponentFixture<JdScoreDashboardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JdScoreDashboardContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JdScoreDashboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
