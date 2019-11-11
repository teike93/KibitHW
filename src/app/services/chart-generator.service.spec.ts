import { TestBed } from '@angular/core/testing';

import { ChartGeneratorService } from './chart-generator.service';

describe('ChartGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartGeneratorService = TestBed.get(ChartGeneratorService);
    expect(service).toBeTruthy();
  });
});
