import { TestBed } from '@angular/core/testing';

import { RecettesService } from './recettes.service';

describe('ProduitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecettesService = TestBed.get(RecettesService);
    expect(service).toBeTruthy();
  });
});
