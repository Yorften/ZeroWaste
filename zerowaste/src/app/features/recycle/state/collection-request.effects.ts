import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, delay } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CollectionRequestActions } from './collection-request.actions';
import { CollectionRequestService } from '../../../core/services/collection-request/collection-request.service';


@Injectable()
export class CollectionRequestEffects {

  loadCollectionRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionRequestActions.loadCollectionRequests),
      mergeMap(action =>
        this.collectionRequestService.getCollectionRequests(action.userId).pipe(
          delay(2000),
          map(collectionRequests =>
            CollectionRequestActions.loadCollectionRequestsSuccess({ collectionRequests })
          ),
          catchError(error =>
            of(CollectionRequestActions.loadCollectionRequestsFailure({ status: 'error' }))
          )
        )
      )
    )
  );

  addCollectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionRequestActions.addCollectionRequest),
      mergeMap(action =>
        this.collectionRequestService.createCollectionRequest(action.collectionRequest).pipe(
          delay(2000),
          map(collectionRequest =>
            CollectionRequestActions.addCollectionRequestSuccess({ collectionRequest: collectionRequest })
          ),
          catchError(error =>
            of(CollectionRequestActions.addCollectionRequestFailure({ error: 'error' }))
          )
        )
      )
    )
  );

  updateCollectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionRequestActions.updateCollectionRequest),
      mergeMap(action =>
        this.collectionRequestService.updateCollectionRequest(action.collectionRequest).pipe(
          delay(2000),
          map(updatedRequest =>
            CollectionRequestActions.updateCollectionRequestSuccess({
              collectionRequest: { id: updatedRequest.id, changes: updatedRequest }
            })
          ),
          catchError(error =>
            of(CollectionRequestActions.updateCollectionRequestFailure({ error: 'error' }))
          )
        )
      )
    )
  );

  deleteCollectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionRequestActions.deleteCollectionRequest),
      mergeMap(action =>
        this.collectionRequestService.deleteCollectionRequest(action.id).pipe(
          map(() =>
            CollectionRequestActions.deleteCollectionRequestSuccess({ id: action.id })
          ),
          catchError(error =>
            of(CollectionRequestActions.deleteCollectionRequestFailure({ error: 'error' }))
          )
        )
      )
    )
  );


  constructor(private actions$: Actions, private collectionRequestService: CollectionRequestService) {}
}
