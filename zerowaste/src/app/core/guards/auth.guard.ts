import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../features/auth/state/auth.selectors';
import { map, take } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  return store.select(selectUserState).pipe(
    take(1),
    map(user => {
      return user ? true : router.createUrlTree(['/auth/login']);
    })
  );
};
