import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JdScoreDashboardHeaderComponent } from './jd-score-dashboard-header.component';

describe('JdScoreDashboardHeaderComponent', () => {
  let component: JdScoreDashboardHeaderComponent;
  let fixture: ComponentFixture<JdScoreDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JdScoreDashboardHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JdScoreDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
