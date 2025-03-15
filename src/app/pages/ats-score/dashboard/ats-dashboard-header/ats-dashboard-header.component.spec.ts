import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtsHeaderComponent } from './ats-dashboard-header.component';

describe('AtsHeaderComponent', () => {
  let component: AtsHeaderComponent;
  let fixture: ComponentFixture<AtsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtsHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
