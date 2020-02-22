import { TestBed } from '@angular/core/testing';

import { CroissantService } from './croissant.service';

describe('CroissantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CroissantService = TestBed.get(CroissantService);
    expect(service).toBeTruthy();
  });
});
