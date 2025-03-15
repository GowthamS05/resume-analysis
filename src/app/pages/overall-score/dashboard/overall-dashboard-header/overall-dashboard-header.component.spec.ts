import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallDashboardHeaderComponent } from './overall-dashboard-header.component';

describe('OverallDashboardHeaderComponent', () => {
  let component: OverallDashboardHeaderComponent;
  let fixture: ComponentFixture<OverallDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallDashboardHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
