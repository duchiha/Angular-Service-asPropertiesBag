import { TestBed } from '@angular/core/testing';

import { ProductParamsBagService } from './product-params-bag.service';

describe('ProductParamsBagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductParamsBagService = TestBed.get(ProductParamsBagService);
    expect(service).toBeTruthy();
  });
});
