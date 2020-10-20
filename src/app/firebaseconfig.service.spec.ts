import { TestBed } from '@angular/core/testing';

import { FirebaseconfigService } from './firebaseconfig.service';

describe('FirebaseconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseconfigService = TestBed.get(FirebaseconfigService);
    expect(service).toBeTruthy();
  });
});
