import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCroissantComponent } from './admin-croissant.component';

describe('AdminCroissantComponent', () => {
  let component: AdminCroissantComponent;
  let fixture: ComponentFixture<AdminCroissantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCroissantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCroissantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
