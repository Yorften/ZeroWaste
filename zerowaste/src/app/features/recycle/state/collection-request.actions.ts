import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CollectionRequest } from '../../../shared/models/collection-request.model';


export const CollectionRequestActions = createActionGroup({
  source: 'CollectionRequest/API',
  events: {
    'Load CollectionRequests': props<{ collectionRequests: CollectionRequest[] }>(),
    'Add CollectionRequest': props<{ collectionRequest: CollectionRequest }>(),
    'Upsert CollectionRequest': props<{ collectionRequest: CollectionRequest }>(),
    'Add CollectionRequests': props<{ collectionRequests: CollectionRequest[] }>(),
    'Upsert CollectionRequests': props<{ collectionRequests: CollectionRequest[] }>(),
    'Update CollectionRequest': props<{ collectionRequest: Update<CollectionRequest> }>(),
    'Update CollectionRequests': props<{ collectionRequests: Update<CollectionRequest>[] }>(),
    'Delete CollectionRequest': props<{ id: string }>(),
    'Delete CollectionRequests': props<{ ids: string[] }>(),
    'Clear CollectionRequests': emptyProps(),
  }
});
