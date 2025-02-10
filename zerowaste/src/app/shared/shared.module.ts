import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { GlobalLoadingComponent } from './components/global-loading/global-loading.component';
import { GlobalNotificationComponent } from './components/global-notification/global-notification.component';



@NgModule({
  declarations: [
    NavComponent,
    GlobalLoadingComponent,
    GlobalNotificationComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    NavComponent,
    GlobalLoadingComponent,
    GlobalNotificationComponent
  ]
})
export class SharedModule { }
