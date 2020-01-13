import { TestBed } from '@angular/core/testing';

import { AeronaveService } from './aeronave.service';

describe('AeronaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AeronaveService = TestBed.get(AeronaveService);
    expect(service).toBeTruthy();
  });
});
