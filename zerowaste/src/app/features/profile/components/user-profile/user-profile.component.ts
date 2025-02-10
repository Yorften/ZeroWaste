import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../../state/user.actions';
import { selectUserState } from '../../../auth/state/auth.selectors';
import { User } from '../../../../shared/models/user.model';
import { Observable } from 'rxjs';
import { selectLoadingState, selectStatusState } from '../../state/user.selectors';
import { status } from '../../../auth/state/auth.actions';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  profileForm: FormGroup;
  status$: Observable<status> = this.store.select(selectStatusState);
  loading$: Observable<boolean> = this.store.select(selectLoadingState);
  user: User | null = null;

  constructor(private fb: FormBuilder, private store: Store) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(32)]],
      address: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      birth_date: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.store.select(selectUserState).subscribe(user => {
      if (user) {
        this.user = user;
        this.profileForm.patchValue({
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          address: user.address,
          phone_number: user.phone_number,
          birth_date: user.birth_date
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
    const updatedData = this.profileForm.value;

    const userUpdate = { id: this.user!.id, changes: updatedData };
    this.store.dispatch(UserActions.updateUser({ user: userUpdate }));
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.profileForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }
}
