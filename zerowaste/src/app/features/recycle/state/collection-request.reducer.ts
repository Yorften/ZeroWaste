import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CollectionRequestActions } from './collection-request.actions';
import { CollectionRequest } from '../../../shared/models/collection-request.model';

export const collectionRequestsFeatureKey = 'collectionRequests';

export interface State extends EntityState<CollectionRequest> {
  resolverLoadingState: boolean;
  getRequestsLoadingState: boolean;
  requestLoadingState: boolean;
  editedCollectionRequest: CollectionRequest | null;
  status: 'success' | string | null;
}

export const adapter: EntityAdapter<CollectionRequest> = createEntityAdapter<CollectionRequest>();

export const initialState: State = adapter.getInitialState({
  resolverLoadingState: false,
  getRequestsLoadingState: false,
  requestLoadingState: false,
  editedCollectionRequest: null,
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

  on(CollectionRequestActions.getCollectionRequests, (state) => ({
    ...state,
    getRequestsLoadingState: true,
    status: null,
  })),
  on(CollectionRequestActions.getCollectionRequestsSuccess, (state, { collectionRequests }) =>
    adapter.setAll(collectionRequests, {
      ...state,
      getRequestsLoadingState: false,
    })
  ),
  on(CollectionRequestActions.getCollectionRequestsFailure, (state, { status }) => ({
    ...state,
    getRequestsLoadingState: false,
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
  on(CollectionRequestActions.updateCollectionRequestSuccess, (state, { collectionRequest }) => {
    return {
      ...adapter.updateOne(collectionRequest, state),
      requestLoadingState: false,
      status: null,
    };
  }),
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
  })),


  on(CollectionRequestActions.editCollectionRequest, (state, { collectionRequest }) => ({
    ...state,
    editedCollectionRequest: collectionRequest,
  })),
  on(CollectionRequestActions.clearEditedCollectionRequest, (state) => ({
    ...state,
    editedCollectionRequest: null,
  })),

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
    selectGetRequestLoadingState: createSelector(
      selectCollectionRequestsState,
      (state: State) => state.getRequestsLoadingState
    ),
    selectStatusState: createSelector(
      selectCollectionRequestsState,
      (state: State) => state.status
    ),
    selectEditedCollectionRequest: createSelector(
      selectCollectionRequestsState,
      (state: State) => state.editedCollectionRequest
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
  selectEditedCollectionRequest,
  selectGetRequestLoadingState,

} = collectionRequestsFeature;
