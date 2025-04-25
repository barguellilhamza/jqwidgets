import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPayListComponent } from './monthly-pay-list.component';

describe('MonthlyPayComponent', () => {
  let component: MonthlyPayListComponent;
  let fixture: ComponentFixture<MonthlyPayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyPayListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyPayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
