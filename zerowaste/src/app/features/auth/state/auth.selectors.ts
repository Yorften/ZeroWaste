import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectUserState = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.user
);

export const selectStatusState = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.status
);

export const selectLoadingState = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.loading
);
