import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { GlobalLoadingComponent } from './components/global-loading/global-loading.component';
import { GlobalNotificationComponent } from './components/global-notification/global-notification.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { CollectionRequestFormComponent } from './components/collection-request-form/collection-request-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavComponent,
    GlobalLoadingComponent,
    GlobalNotificationComponent,
    ButtonPrimaryComponent,
    CollectionRequestFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    NavComponent,
    GlobalLoadingComponent,
    GlobalNotificationComponent,
    ButtonPrimaryComponent,
    CollectionRequestFormComponent,
  ]
})
export class SharedModule { }
