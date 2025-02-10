import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CollectionRequestActions } from './collection-request.actions';
import { CollectionRequest } from '../../../shared/models/collection-request.model';

export const collectionRequestsFeatureKey = 'collectionRequests';

export interface State extends EntityState<CollectionRequest> {
  resolverLoadingState: boolean;
  requestLoadingState: boolean;
  status: 'success' | string | null;
}

export const adapter: EntityAdapter<CollectionRequest> = createEntityAdapter<CollectionRequest>();

export const initialState: State = adapter.getInitialState({
  resolverLoadingState: false,
  requestLoadingState: false,
  status: null,
});

export const reducer = createReducer(
  initialState,

  on(CollectionRequestActions.loadCollectionRequests, (state) => ({
    ...state,
    resolverLoadingState: true,
    status: null,
  })),
  on(CollectionRequestActions.loadCollectionRequestsSuccess, (state, { collectionRequests }) =>
    adapter.setAll(collectionRequests, {
      ...state,
      resolverLoadingState: false,
    })
  ),
  on(CollectionRequestActions.loadCollectionRequestsFailure, (state, { status }) => ({
    ...state,
    resolverLoadingState: false,
    status,
  })),


  on(CollectionRequestActions.addCollectionRequest, (state) => ({
    ...state,
    requestLoadingState: true,
    status: null,
  })),
  on(CollectionRequestActions.addCollectionRequestSuccess, (state, { collectionRequest }) =>
    adapter.addOne(collectionRequest, {
      ...state,
      requestLoadingState: false,
      status: 'success',
    })
  ),
  on(CollectionRequestActions.addCollectionRequestFailure, (state, { error }) => ({
    ...state,
    requestLoadingState: false,
    status: error,
  })),


  on(CollectionRequestActions.updateCollectionRequest, (state) => ({
    ...state,
    requestLoadingState: true,
    status: null,
  })),
  on(CollectionRequestActions.updateCollectionRequestSuccess, (state, { collectionRequest }) =>
    adapter.updateOne(collectionRequest, {
      ...state,
      requestLoadingState: false,
      status: 'success',
    })
  ),
  on(CollectionRequestActions.updateCollectionRequestFailure, (state, { error }) => ({
    ...state,
    requestLoadingState: false,
    status: error,
  })),


  on(CollectionRequestActions.deleteCollectionRequest, (state) => ({
    ...state,
    requestLoadingState: true,
    status: null,
  })),
  on(CollectionRequestActions.deleteCollectionRequestSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      requestLoadingState: false,
      status: 'success',
    })
  ),
  on(CollectionRequestActions.deleteCollectionRequestFailure, (state, { error }) => ({
    ...state,
    requestLoadingState: false,
    status: error,
  }))

);

export const collectionRequestsFeature = createFeature({
  name: collectionRequestsFeatureKey,
  reducer,
  extraSelectors: ({ selectCollectionRequestsState }) => ({
    ...adapter.getSelectors(selectCollectionRequestsState),
    selectResolverLoadingState: createSelector(
      selectCollectionRequestsState,
      (state: State) => state.resolverLoadingState
    ),
    selectRequestLoadingState: createSelector(
      selectCollectionRequestsState,
      (state: State) => state.requestLoadingState
    ),
    selectStatusState: createSelector(
      selectCollectionRequestsState,
      (state: State) => state.status
    ),
  }),

});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectResolverLoadingState,
  selectRequestLoadingState,
  selectStatusState,

} = collectionRequestsFeature;
