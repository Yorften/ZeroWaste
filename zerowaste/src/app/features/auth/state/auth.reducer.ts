import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../../../shared/models/user.model';

export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
  loading: boolean;
  status: 'success' | string | null;
}

function getInitialUser(): User | null {
  if (typeof localStorage !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
}


export const initialState: State = {
  user: getInitialUser(),
  loading: false,
  status: null,
};


export const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { user, status }) => ({
    ...state,
    user: user,
    loading: false,
    status: status
  })),
  on(AuthActions.loginFailure, (state, { status }) => ({
    ...state,
    loading: false,
    status: status
  })),


  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    status: null
  })),
  on(AuthActions.registerSuccess, (state, { status }) => ({
    ...state,
    loading: false,
    status: status
  })),
  on(AuthActions.registerFailure, (state, { status }) => ({
    ...state,
    loading: false,
    status: status
  })),



  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,
    status: null
  })),
  on(AuthActions.logoutSuccess, (state, { status }) => ({
    ...state,
    user: null,
    loading: false,
    status: status
  })),
  on(AuthActions.logoutFailure, (state, { status }) => ({
    ...state,
    loading: false,
    status: status
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});

