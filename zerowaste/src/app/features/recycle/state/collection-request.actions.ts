import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CollectionRequest } from '../../../shared/models/collection-request.model';
import { status } from '../../auth/state/auth.actions';
import { User } from '../../../shared/models/user.model';


export const CollectionRequestActions = createActionGroup({
  source: 'CollectionRequest/API',
  events: {
    'Load CollectionRequests': props<{ userId?: string }>(),
    'Load CollectionRequests Success': props<{ collectionRequests: CollectionRequest[] }>(),
    'Load CollectionRequests Failure': props<{ status: status }>(),

    'Add Collection Request': props<{ collectionRequest: CollectionRequest }>(),
    'Add Collection Request Success': props<{ collectionRequest: CollectionRequest }>(),
    'Add Collection Request Failure': props<{ error: status }>(),

    'Update Collection Request': props<{ collectionRequest: Update<CollectionRequest> }>(),
    'Update Collection Request Success': props<{ collectionRequest: Update<CollectionRequest> }>(),
    'Update Collection Request Failure': props<{ error: status }>(),

    'Delete Collection Request': props<{ id: string }>(),
    'Delete Collection Request Success': props<{ id: string }>(),
    'Delete Collection Request Failure': props<{ error: status }>(),

    'Edit Collection Request': props<{ collectionRequest: CollectionRequest }>(),
    'Clear Edited Collection Request': emptyProps(),
  }
});
