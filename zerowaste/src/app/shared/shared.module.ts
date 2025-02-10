import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { GlobalLoadingComponent } from './components/global-loading/global-loading.component';



@NgModule({
  declarations: [
    NavComponent,
    GlobalLoadingComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    NavComponent,
    GlobalLoadingComponent
  ]
})
export class SharedModule { }
