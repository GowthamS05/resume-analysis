import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallDashboardContentComponent } from './overall-dashboard-content.component';

describe('OverallDashboardContentComponent', () => {
  let component: OverallDashboardContentComponent;
  let fixture: ComponentFixture<OverallDashboardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallDashboardContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallDashboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
