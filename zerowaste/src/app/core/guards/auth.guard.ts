import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../features/auth/state/auth.selectors';
import { map, take } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // If not in browser (e.g. during SSR), allow navigation.
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  return store.select(selectUser).pipe(
    take(1),
    map(user => {
      return user ? true : router.createUrlTree(['/auth/login']);
    })
  );
};
