import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CollectionRequest, RequestStatus } from '../../../../shared/models/collection-request.model';
import { selectAll, selectGetRequestLoadingState } from '../../state/collection-request.reducer';
import { selectUserState } from '../../../auth/state/auth.selectors';
import { CollectionRequestActions } from '../../state/collection-request.actions';
import { Update } from '@ngrx/entity';
import { User } from '../../../../shared/models/user.model';

function getStatusPriority(status: RequestStatus): number {
  switch (status) {
    case RequestStatus.ON_HOLD:
      return 0;
    case RequestStatus.OCCUPIED:
      return 1;
    case RequestStatus.IN_PROGRESS:
      return 2;
    default:
      return 3;
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  isOpen: boolean = false;
  RequestStatus = RequestStatus;
  statuses: string[] = ['ON_HOLD', 'OCCUPIED', 'IN_PROGRESS', 'ACCEPTED', 'REJECTED'];
  ON_HOLD: RequestStatus = RequestStatus.ON_HOLD;

  collectionRequests$: Observable<CollectionRequest[]> = this.store.select(selectAll).pipe(
    map(requests =>
      requests.slice().sort((a, b) => {
        const priorityA = getStatusPriority(a.status);
        const priorityB = getStatusPriority(b.status);

        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }

        const dateA = new Date(a.collect_date).getTime();
        const dateB = new Date(b.collect_date).getTime();
        return dateA - dateB;
      })
    )
  );
  user$: Observable<User | null> = this.store.select(selectUserState);
  loading$: Observable<boolean> = this.store.select(selectGetRequestLoadingState);
  isIndividual$: Observable<boolean> = this.user$.pipe(
    map(user => user?.role === 'INDIVIDUAL')
  )

  constructor(private store: Store) { }

  onStatusChange(newStatus: string, collectionRequest: CollectionRequest): void {
    const numericStatus = RequestStatus[newStatus as keyof typeof RequestStatus];
    const update: Update<CollectionRequest> = {
      id: collectionRequest.id,
      changes: { status: numericStatus }
    };
    this.store.dispatch(CollectionRequestActions.updateCollectionRequest({ collectionRequest: update }));
  }


  closeCollectioRequestForm() {
    this.isOpen = false;
  }

  editCollectioRequest(collectionRequest: CollectionRequest) {
    this.store.dispatch(CollectionRequestActions.editCollectionRequest({ collectionRequest }))
    this.isOpen = true;
  }
}
