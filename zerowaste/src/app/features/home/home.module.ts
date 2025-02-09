import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AuthModule } from '../auth/auth.module';
import { RecycleModule } from '../recycle/recycle.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AuthModule,
    RecycleModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
