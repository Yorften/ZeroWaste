import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { User } from './shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectUserState } from './features/auth/state/auth.selectors';
import { selectResolverLoadingState } from './features/profile/state/user.selectors';
import { selectResolverLoadingState as selectDashboardResolverState } from './features/recycle/state/collection-request.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'zerowaste';
  user$: Observable<User | null> = this.store.select(selectUserState);

  profileResolverLoadingState$: Observable<boolean> = this.store.select(selectResolverLoadingState);
  dashboardResolverLoadingState$: Observable<boolean> = this.store.select(selectDashboardResolverState);

  constructor(private store: Store) { }

  notLoading$: Observable<boolean> = combineLatest([
    this.profileResolverLoadingState$,
    this.dashboardResolverLoadingState$
  ]).pipe(
    map(([profileLoading, dashboardLoading]) => !profileLoading && !dashboardLoading)
  );

  loading$: Observable<boolean> = combineLatest([
    this.profileResolverLoadingState$,
    this.dashboardResolverLoadingState$
  ]).pipe(
    map(([profileLoading, dashboardLoading]) => profileLoading || dashboardLoading)
  );

}
