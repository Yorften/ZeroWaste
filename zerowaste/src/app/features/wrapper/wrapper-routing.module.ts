import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('../recycle/recycle.module').then(m => m.RecycleModule) },
  { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WrapperRoutingModule { }
