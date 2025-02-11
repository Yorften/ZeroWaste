import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, take } from 'rxjs';
import { CollectionRequest, MaterialType, RequestStatus } from '../../models/collection-request.model';
import { selectEditedCollectionRequest, selectRequestLoadingState, selectStatusState } from '../../../features/recycle/state/collection-request.reducer';
import { CollectionRequestActions } from '../../../features/recycle/state/collection-request.actions';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { selectUserState } from '../../../features/auth/state/auth.selectors';

function futureDateValidator() {
  return (control: AbstractControl): ValidationErrors | null => {

    if (!control.value) {
      return null;
    }

    const selectedDate = new Date(control.value);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate < today ? { pastDate: true } : null;
  };
}

@Component({
  selector: 'app-collection-request-form',
  templateUrl: './collection-request-form.component.html',
})
export class CollectionRequestFormComponent {

  @Output() close = new EventEmitter<void>();
  types: string[] = Object.values(MaterialType).filter(value => typeof value === 'string') as string[];
  collectionRequestForm: FormGroup;

  editedCollectionRequest$: Observable<CollectionRequest | null> = this.store.select(selectEditedCollectionRequest);
  user$: Observable<User | null> = this.store.select(selectUserState);
  loading$: Observable<boolean> = this.store.select(selectRequestLoadingState);

  private subscription: Subscription;

  constructor(private store: Store, private fb: FormBuilder) {
    this.collectionRequestForm = this.fb.group({
      type: ['', Validators.required],
      estimated_weight: ['', [Validators.required, Validators.min(1000)]],
      collect_address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      collect_date: ['', [Validators.required, futureDateValidator]],
    });

    this.subscription = this.editedCollectionRequest$.subscribe((req) => {
      if (req) {
        this.collectionRequestForm.patchValue({
          type: req.type,
          estimated_weight: req.estimated_weight,
          collect_address: req.collect_address,
          collect_date: this.formatDate(req.collect_date),
        });
        this.collectionRequestForm.addControl('id', this.fb.control(req.id));
      }
    });
  }


  isFieldInvalid(fieldName: string): boolean {
    const control = this.collectionRequestForm.get(fieldName);
    return control ? (control.invalid && (control.dirty || control.touched)) : false;
  }


  onSubmit(): void {
    if (this.collectionRequestForm.invalid) return;

    this.user$.pipe(take(1)).subscribe(user => {
      if (!user) {
        return;
      }

      const formValues = this.collectionRequestForm.value;

      const collectionRequestDTO: CollectionRequest = {
        id: `req-${Date.now()}-${Math.random().toString(36)}`,
        type: formValues.type,
        estimated_weight: formValues.estimated_weight,
        collect_address: formValues.collect_address,
        collect_date: new Date(formValues.collect_date),
        status: RequestStatus.ON_HOLD,
        user_id: user.id
      };

      if (formValues.id) { // Update collection request 
        this.store.dispatch(CollectionRequestActions.updateCollectionRequest({
          collectionRequest: { id: formValues.id, changes: collectionRequestDTO }
        }));
      } else {
        console.log(collectionRequestDTO);
        this.store.dispatch(CollectionRequestActions.addCollectionRequest({
          collectionRequest: collectionRequestDTO as CollectionRequest
        }));
      }
      this.closeForm();
    });
  }

  deleteCollectionRequest() {

    this.editedCollectionRequest$.pipe(
      take(1)
    ).subscribe(collectionRequest => {
      if (collectionRequest) {
        this.store.dispatch(CollectionRequestActions.deleteCollectionRequest({ id: collectionRequest.id }));
      }
    });

    this.closeForm()
  }


  private formatDate(date: Date | string): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }



  // Popup methods
  closeForm() {
    this.close.emit();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('.popup-background') && !target.closest('.popup-form-container')) {
      this.closeForm();
    }
  }

  ngOnDestroy() {
    if (this.editedCollectionRequest$) {
      this.store.dispatch(CollectionRequestActions.clearEditedCollectionRequest());
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
