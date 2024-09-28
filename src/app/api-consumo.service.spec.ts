import { TestBed } from '@angular/core/testing';

import { ApiConsumoService } from './api-consumo.service';

describe('ApiConsumoService', () => {
  let service: ApiConsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
