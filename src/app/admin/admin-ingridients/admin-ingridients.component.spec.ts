import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIngridientsComponent } from './admin-ingridients.component';

describe('AdminIngridientsComponent', () => {
  let component: AdminIngridientsComponent;
  let fixture: ComponentFixture<AdminIngridientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIngridientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIngridientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
