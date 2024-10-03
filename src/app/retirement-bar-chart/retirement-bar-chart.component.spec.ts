import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementBarChartComponent } from './retirement-bar-chart.component';

describe('RetirementBarChartComponent', () => {
  let component: RetirementBarChartComponent;
  let fixture: ComponentFixture<RetirementBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetirementBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirementBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
