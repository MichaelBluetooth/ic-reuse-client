import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListingComponent } from './add-listing/add-listing.component';
import { ListingComponent } from './components/listing/listing.component';
import { ListingsComponent } from './components/listings/listings.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ListingsComponent,
  },
  {
    path: 'listings/add',
    component: AddListingComponent,
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
