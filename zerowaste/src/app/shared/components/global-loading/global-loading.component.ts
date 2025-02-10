import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectResolverLoadingState } from '../../../features/profile/state/user.selectors';
import { selectResolverLoadingState as selectDashboardResolver } from '../../../features/recycle/state/collection-request.reducer';

@Component({
  selector: 'app-global-loading',
  templateUrl: './global-loading.component.html',
})
export class GlobalLoadingComponent {

  profileResolverLoadingState$: Observable<boolean> = this.store.select(selectResolverLoadingState);
  dashboardResolverLoadingState$: Observable<boolean> = this.store.select(selectDashboardResolver);
    constructor(private store: Store){ }

}
