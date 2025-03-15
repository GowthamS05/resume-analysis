import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsDashboardContentComponent } from './ats-dashboard-content.component';

describe('AtsDashboardContentComponent', () => {
  let component: AtsDashboardContentComponent;
  let fixture: ComponentFixture<AtsDashboardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtsDashboardContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsDashboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
