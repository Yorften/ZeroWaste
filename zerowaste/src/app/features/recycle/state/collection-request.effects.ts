import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, delay, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CollectionRequestActions } from './collection-request.actions';
import { CollectionRequestService } from '../../../core/services/collection-request/collection-request.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { Store } from '@ngrx/store';
import { selectUserState } from '../../auth/state/auth.selectors';


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

  getCollectionRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionRequestActions.getCollectionRequests),
      mergeMap(action =>
        this.collectionRequestService.getCollectionRequests(action.userId).pipe(
          delay(1000),
          map(collectionRequests =>
            CollectionRequestActions.getCollectionRequestsSuccess({ collectionRequests })
          ),
          catchError(error =>
            of(CollectionRequestActions.getCollectionRequestsFailure({ status: 'error' }))
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
          map(collectionRequest => {
            this.notificationService.emitNotification(
              'Your colection request has been registered!',
              'success'
            );
            return CollectionRequestActions.addCollectionRequestSuccess({ collectionRequest: collectionRequest })
          }),
          catchError(error => {
            this.notificationService.emitNotification(
              error,
              'error'
            );
            return of(CollectionRequestActions.addCollectionRequestFailure({ error: 'error' }))
          })
        )
      )
    )
  );

  updateCollectionRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionRequestActions.updateCollectionRequest),
      withLatestFrom(this.store.select(selectUserState)),
      mergeMap(([action, user]) =>
        this.collectionRequestService.updateCollectionRequest(action.collectionRequest).pipe(
          mergeMap(updatedRequest => {
            this.notificationService.emitNotification(
              'Your collection request has been updated!',
              'success'
            );
            const { id, ...changes } = updatedRequest;
            const loadAction =
              user?.role === 'COLLECTOR'
                ? CollectionRequestActions.getCollectionRequests({ userId: undefined })
                : CollectionRequestActions.getCollectionRequests({ userId: updatedRequest.user_id });
            return [
              CollectionRequestActions.updateCollectionRequestSuccess({
                collectionRequest: { id: updatedRequest.id, changes }
              }),
              loadAction
            ];
          }),
          catchError(error => {
            this.notificationService.emitNotification(error, 'error');
            return of(CollectionRequestActions.updateCollectionRequestFailure({ error: 'error' }));
          })
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


  constructor(private actions$: Actions, private collectionRequestService: CollectionRequestService, private notificationService: NotificationService, private store: Store) { }
}
