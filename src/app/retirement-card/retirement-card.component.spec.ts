import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirementCardComponent } from './retirement-card.component';

describe('RetirementCardComponent', () => {
  let component: RetirementCardComponent;
  let fixture: ComponentFixture<RetirementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetirementCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
