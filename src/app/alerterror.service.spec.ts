import { TestBed } from '@angular/core/testing';

import { AlerterrorService } from './alerterror.service';

describe('AlerterrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlerterrorService = TestBed.get(AlerterrorService);
    expect(service).toBeTruthy();
  });
});
