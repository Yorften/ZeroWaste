import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserActions } from './user.actions';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../../shared/models/user.model';
import { CollectionRequestActions } from '../../recycle/state/collection-request.actions';
import { MaterialType, RequestStatus } from '../../../shared/models/collection-request.model';
import { CollectionRequestService } from '../../../core/services/collection-request/collection-request.service';


@Injectable()
export class UserEffects {

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(action =>
        this.userService.getUserById(action.user.id as string).pipe(
          mergeMap(existingUser => {
            if (!existingUser) {
              return of(UserActions.updateUserFailure({ status: 'error' }));
            }
            const updatedUser: User = { ...existingUser, ...action.user.changes };
            return this.userService.updateUser(updatedUser).pipe(
              delay(2000),
              map(user =>
                UserActions.updateUserSuccess({
                  user: { id: user.id, changes: user }
                })
              ),
              catchError(error =>
                of(UserActions.updateUserFailure({ status: error }))
              )
            );
          })
        )
      )
    )
  );

  rewardUserPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionRequestActions.updateCollectionRequestSuccess),
      switchMap(action => {
        const changes = action.collectionRequest.changes;

        if (changes && changes.status === RequestStatus.ACCEPTED) {

          const weightKg = changes.estimated_weight! / 1000;

          let multiplier = 0;

          switch (changes.type?.toString()) {
            case 'PLASTIC':
              multiplier = 2;
              break;
            case 'GLASS':
              multiplier = 1;
              break;
            case 'PAPER':
              multiplier = 1;
              break;
            case 'METAL':
              multiplier = 5;
              break;
            default:
              multiplier = 0;
          }
         
          const rewardPoints = parseFloat((multiplier * weightKg).toFixed(2));

          return of(UserActions.rewardPoints({ points: rewardPoints, userId: changes.user_id! }));
        }
        return of({ type: '[Reward] No Action' });
      })
    )
  );


  // Reward Points Effect
  rewardPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.rewardPoints),
      mergeMap(action =>
        this.userService.getUserById(action.userId).pipe(
          mergeMap(user => {
            if (!user) {
              return of(
                UserActions.rewardPointsFailure({ error: 'User not found' })
              );
            }
            const newPoints = parseFloat((user.points + action.points).toFixed(2));
            const updatedUser: User = { ...user, points: newPoints };
            return this.userService.updateUser(updatedUser).pipe(
              map(() =>
                UserActions.rewardPointsSuccess({
                  points: action.points,
                  userId: action.userId
                })
              ),
              catchError(error =>
                of(UserActions.rewardPointsFailure({ error: 'Error updating user' }))
              )
            );
          })
        )
      )
    )
  );

  // Delete User Effect
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.id).pipe(
          map(() => {
            this.collectionRequestService.deleteCollectionRequestsByUser(action.id)
            return UserActions.deleteUserSuccess({ id: action.id })
          }),
          catchError(error =>
            of(UserActions.deleteUserFailure({ status: error }))
          )
        )
      )
    )
  );


  constructor(private actions$: Actions, private userService: UserService, private collectionRequestService: CollectionRequestService) { }
}
