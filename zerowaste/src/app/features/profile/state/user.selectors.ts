import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectStatusState = createSelector(
  selectUserState,
  (state: fromUser.State) => state.status
);

export const selectLoadingState = createSelector(
  selectUserState,
  (state: fromUser.State) => state.loading
);

export const selectResolverLoadingState = createSelector(
  selectUserState,
  (state: fromUser.State) => state.resolverLoadingState
);
