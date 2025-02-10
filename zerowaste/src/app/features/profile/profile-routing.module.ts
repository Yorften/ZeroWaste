import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { profileResolver } from './resolver/profile.resolver';

const routes: Routes = [
  { path: '', component: UserProfileComponent, canActivate: [AuthGuard], resolve: { profile: profileResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
