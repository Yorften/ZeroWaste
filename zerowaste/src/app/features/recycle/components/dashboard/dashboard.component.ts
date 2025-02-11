import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CollectionRequest, RequestStatus } from '../../../../shared/models/collection-request.model';
import { selectAll } from '../../state/collection-request.reducer';
import { selectUserState } from '../../../auth/state/auth.selectors';
import { CollectionRequestActions } from '../../state/collection-request.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  isOpen: boolean = false;
  collectionRequests$: Observable<CollectionRequest[]> = this.store.select(selectAll);
  RequestStatus = RequestStatus;
  ON_HOLD: RequestStatus = RequestStatus.ON_HOLD;
  isIndividual$: Observable<boolean> = this.store.select(selectUserState).pipe(
    map(user => user?.role === 'INDIVIDUAL')
  )

  constructor(private store: Store) { }

  closeCollectioRequestForm() {
    this.isOpen = false;
  }

  editCollectioRequest(collectionRequest: CollectionRequest) {
    this.store.dispatch(CollectionRequestActions.editCollectionRequest({ collectionRequest }))
    this.isOpen = true;
  }
}
