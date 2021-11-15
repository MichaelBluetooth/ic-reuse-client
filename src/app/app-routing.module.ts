import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { IsAdminGuard } from './core/guards/is-admin.guard';
import { LoggedInGuard } from './core/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listings',
    pathMatch: 'full'
  },  
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'listings',
    loadChildren: () => import('./listings/listings.module').then(m => m.ListingsModule)
  },
  {
    path: 'admin',
    canActivate: [LoggedInGuard, IsAdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
