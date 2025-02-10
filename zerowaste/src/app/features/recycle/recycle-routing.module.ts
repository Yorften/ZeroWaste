import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { collectionRequestListResolver } from './resolver/collection-request-list.resolver';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard], resolve: { data: collectionRequestListResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecycleRoutingModule { }
