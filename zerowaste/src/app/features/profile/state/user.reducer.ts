import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { status } from '../../auth/state/auth.actions';

export const userFeatureKey = 'user';

export interface State {
  resolverLoadingState: boolean;
  loading: boolean;
  status: status
}

export const initialState: State = {
  resolverLoadingState: false,
  loading: false,
  status: null
};

export const reducer = createReducer(
  initialState,

  on(UserActions.rewardPoints, (state, { points, userId }) => ({
    ...state,
    loading: true,
    status: null,
  })),
  on(UserActions.rewardPointsSuccess, (state, { points, userId }) => ({
    ...state,
    loading: false,
    status: 'success',
  })),
  on(UserActions.rewardPointsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    status: error,
  })),


  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    loading: true,
    status: null,
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    status: 'success',
  })),
  on(UserActions.updateUserFailure, (state, { status }) => ({
    ...state,
    loading: false,
    status,
  })),

  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    status: null,
  })),
  on(UserActions.deleteUserSuccess, (state) => ({
    ...state,
    loading: false,
    status: 'success',
  })),
  on(UserActions.deleteUserFailure, (state, { status }) => ({
    ...state,
    loading: false,
    status,
  }))

 
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

