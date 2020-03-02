import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDrinkComponent } from './admin-drink.component';

describe('AdminDrinkComponent', () => {
  let component: AdminDrinkComponent;
  let fixture: ComponentFixture<AdminDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
