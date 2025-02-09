import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { selectUser } from '../../features/auth/state/auth.selectors';
// import { selectJwt } from '../features/auth/state/auth.reducer';

export const UserGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectUser).pipe(
    take(1),
    map(user => {
      if (!user) {
        return true;
      }
      return router.createUrlTree(['/dashboard'], {
      });
    })
  );

  return true;
  
};
