import { TestBed } from '@angular/core/testing';

import { MenssagemService } from './menssagem.service';

describe('MenssagemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenssagemService = TestBed.get(MenssagemService);
    expect(service).toBeTruthy();
  });
});
