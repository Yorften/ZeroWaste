import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserActions } from '../state/user.actions';
import { delay, of, tap } from 'rxjs';

export const profileResolver: ResolveFn<boolean> = (route, state) => {

  const store = inject(Store);

  store.dispatch(UserActions.loadUser());

  return of(true).pipe(
    delay(2000),
    tap(() => store.dispatch(UserActions.loadUserSuccess()))
  );

};
