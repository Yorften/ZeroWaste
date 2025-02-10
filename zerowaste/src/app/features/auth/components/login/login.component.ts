import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions, status } from '../../state/auth.actions';
import { Observable, Subscription } from 'rxjs';
import { selectLoadingState, selectStatusState, selectUserState } from '../../state/auth.selectors';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  status$: Observable<status> = this.store.select(selectStatusState);
  loading$: Observable<boolean> = this.store.select(selectLoadingState);
  private userSubscription: Subscription = new Subscription();;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
    });
  }

  ngOnInit(): void {
    this.userSubscription = this.store.select(selectUserState).subscribe((user: User | null) => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }


  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const loginData = this.loginForm.value;
    console.log(loginData);

    this.store.dispatch(AuthActions.login({
      username: loginData.username,
      password: loginData.password
    }));
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
