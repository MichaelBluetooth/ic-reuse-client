import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { ListingComponent } from './components/listing/listing.component';
import { ListingsComponent } from './components/listings/listings.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: ListingsComponent,
  },
  {
    path: 'listings/add',
    component: AddListingComponent,
    canActivate: [
      LoggedInGuard
    ]
  },
  {
    path: 'listings/:id',
    component: ListingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
