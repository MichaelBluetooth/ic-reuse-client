import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { ListingComponent } from './components/listing/listing.component';
import { ListingsComponent } from './components/listings/listings.component';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { ListingsResolver } from './resolvers/listings/listings.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListingsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      listings: ListingsResolver
    }
  },
  {
    path: 'listings/add',
    component: AddListingComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'listings/:id',
    component: ListingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [LoggedInGuard, IsAdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
