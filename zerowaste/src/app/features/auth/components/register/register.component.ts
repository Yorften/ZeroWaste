import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions, status } from '../../state/auth.actions';
import { User } from '../../../../shared/models/user.model';
import { Observable } from 'rxjs';
import { selectLoading, selectStatus } from '../../state/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  status$: Observable<status> = this.store.select(selectStatus);
  loading$: Observable<boolean> = this.store.select(selectLoading);

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      address: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      birth_date: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    return password === repeatPassword ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    const { name, last_name, email, password, address, phone_number, birth_date } = this.registerForm.value;

    const newUser: User = {
      id: `user-${Date.now()}-${Math.random().toString(36)}`,
      email,
      password,
      name,
      last_name,
      address,
      phone_number,
      birth_date: new Date(birth_date),
      role: 'INDIVIDUAL',
      points: 0
    };

    this.store.dispatch(AuthActions.register({ user: newUser }));
    this.registerForm.reset();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.registerForm.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

}
