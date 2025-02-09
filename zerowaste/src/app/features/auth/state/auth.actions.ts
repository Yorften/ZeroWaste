import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';

type status = 'success' | string | null;

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ username: string, password: string }>(),
    'Login Success': props<{ user: User, status: status }>(),
    'Login Failure': props<{ status: status }>(),

    'Register': props<{ user: User }>(),
    'Register Success': props<{ status: status }>(),
    'Register Failure': props<{ status: status }>(),

    'Logout': emptyProps(),
    'Logout Success': props<{ status: status }>(),
    'Logout Failure': props<{ status: status }>()
  }
});
