import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCroissantComponent } from './your-croissant.component';

describe('YourCroissantComponent', () => {
  let component: YourCroissantComponent;
  let fixture: ComponentFixture<YourCroissantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourCroissantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourCroissantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
