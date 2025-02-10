import { inject } from '@angular/core';
import { ResolveFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, map, of, take, tap } from 'rxjs';
import { CollectionRequestActions } from '../state/collection-request.actions';
import { selectUserState } from '../../auth/state/auth.selectors';

export const collectionRequestListResolver: ResolveFn<boolean | UrlTree> = (route, state) => {

  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUserState).pipe(
    take(1),
    map(user => {
      if (user) {
        if (user.role === 'INDIVIDUAL') {
          store.dispatch(CollectionRequestActions.loadCollectionRequests({ userId: user.id }));
        } else {
          store.dispatch(CollectionRequestActions.loadCollectionRequests({ userId: undefined }));
        }
        return true;
      }
      return router.createUrlTree(['/auth/login']);
    })
  );

};
