import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { selectUserState } from '../../../features/auth/state/auth.selectors';
import { AuthActions } from '../../../features/auth/state/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  user$: Observable<User | null> = this.store.select(selectUserState)
  private userSubscription: Subscription = new Subscription();;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select(selectUserState).subscribe((user: User | null) => {
      if (!user) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
