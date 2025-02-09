import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from './features/auth/state/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'zerowaste';
  user$: Observable<User | null> = this.store.select(selectUser);

  constructor(private store: Store){}
}
