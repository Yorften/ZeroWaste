import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { collectionRequestListResolver } from './collection-request-list.resolver';

describe('collectionRequestListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => collectionRequestListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
