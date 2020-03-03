import { TestBed } from '@angular/core/testing';

import { IngridientsService } from './ingridients.service';

describe('IngridientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngridientsService = TestBed.get(IngridientsService);
    expect(service).toBeTruthy();
  });
});
