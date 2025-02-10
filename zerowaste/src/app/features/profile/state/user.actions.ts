import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';
import { status } from '../../auth/state/auth.actions';
import { Update } from '@ngrx/entity';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Reward Points': props<{ points: number; userId: string }>(),
    'Reward Points Success': props<{ points: number; userId: string }>(),
    'Reward Points Failure': props<{ error: string }>(),

    'Update User': props<{ user: Update<User> }>(),
    'Update User Success': props<{ user: Update<User> }>(),
    'Update User Failure': props<{ status: status }>(),

    'Delete User': props<{ id: string }>(),
    'Delete User Success': props<{ id: string }>(),
    'Delete User Failure': props<{ status: status }>(),
  }
});
