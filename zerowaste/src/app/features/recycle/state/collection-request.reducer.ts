import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CollectionRequestActions } from './collection-request.actions';
import { CollectionRequest } from '../../../shared/models/collection-request.model';

export const collectionRequestsFeatureKey = 'collectionRequests';

export interface State extends EntityState<CollectionRequest> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CollectionRequest> = createEntityAdapter<CollectionRequest>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(CollectionRequestActions.addCollectionRequest,
    (state, action) => adapter.addOne(action.collectionRequest, state)
  ),
  on(CollectionRequestActions.upsertCollectionRequest,
    (state, action) => adapter.upsertOne(action.collectionRequest, state)
  ),
  on(CollectionRequestActions.addCollectionRequests,
    (state, action) => adapter.addMany(action.collectionRequests, state)
  ),
  on(CollectionRequestActions.upsertCollectionRequests,
    (state, action) => adapter.upsertMany(action.collectionRequests, state)
  ),
  on(CollectionRequestActions.updateCollectionRequest,
    (state, action) => adapter.updateOne(action.collectionRequest, state)
  ),
  on(CollectionRequestActions.updateCollectionRequests,
    (state, action) => adapter.updateMany(action.collectionRequests, state)
  ),
  on(CollectionRequestActions.deleteCollectionRequest,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CollectionRequestActions.deleteCollectionRequests,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CollectionRequestActions.loadCollectionRequests,
    (state, action) => adapter.setAll(action.collectionRequests, state)
  ),
  on(CollectionRequestActions.clearCollectionRequests,
    state => adapter.removeAll(state)
  ),
);

export const collectionRequestsFeature = createFeature({
  name: collectionRequestsFeatureKey,
  reducer,
  extraSelectors: ({ selectCollectionRequestsState }) => ({
    ...adapter.getSelectors(selectCollectionRequestsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = collectionRequestsFeature;
