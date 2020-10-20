import { TestBed } from '@angular/core/testing';

import { CameraimageService } from './cameraimage.service';

describe('CameraimageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CameraimageService = TestBed.get(CameraimageService);
    expect(service).toBeTruthy();
  });
});
