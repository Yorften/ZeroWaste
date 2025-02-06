import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CollectionRequestActions } from './collection-request.actions';


@Injectable()
export class CollectionRequestEffects {

  loadCollectionRequests$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CollectionRequestActions.loadCollectionRequests),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CollectionRequestActions.loadCollectionRequestsSuccess({ data })),
          catchError(error => of(CollectionRequestActions.loadCollectionRequestsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
