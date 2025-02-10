import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, delay, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserService } from '../../../core/services/user/user.service';
import { UserActions } from '../../profile/state/user.actions';
import { User } from '../../../shared/models/user.model';
import { NotificationService } from '../../../core/services/notification/notification.service';


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          delay(2000),
          map(user => {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('user', JSON.stringify(user));
            }
            return AuthActions.loginSuccess({ user, status: 'success' })
          }),
          catchError((error) => of(AuthActions.loginFailure({ status: error })))
        )
      )
    )
  );


  updateAuthentificatedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserSuccess),
      mergeMap(action => {
        if (typeof localStorage !== 'undefined') {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const currentUser: User = JSON.parse(storedUser);
            const update = action.user; // Update<User>
            if (currentUser.id === update.id) {
              const updatedUser: User = { ...currentUser, ...update.changes };
              localStorage.setItem('user', JSON.stringify(updatedUser));
              
              this.notificationService.emitNotification(
                'Profile updated successfully!',
                'success'
              );

              return of(AuthActions.refreshUser({ user: updatedUser }));
            }
          }
        }
        return of({ type: '[User] No Action' });
      }),
    )
  );


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(action =>
        this.userService.register(action.user).pipe(
          delay(2000),
          map(() => AuthActions.registerSuccess({ status: 'success' })),
          catchError((error) => of(AuthActions.registerFailure({ status: error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('user');
        }
        return AuthActions.logoutSuccess({ status: 'success' });
      })
    )
  );


  constructor(private actions$: Actions, private authService: AuthService, private userService: UserService, private notificationService: NotificationService) { }
}
