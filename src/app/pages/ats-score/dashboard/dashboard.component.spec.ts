import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ATSDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: ATSDashboardComponent;
  let fixture: ComponentFixture<ATSDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ATSDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ATSDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
