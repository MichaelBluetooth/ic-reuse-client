import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../core/guards/logged-in.guard';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { ListingComponent } from './components/listing/listing.component';
import { ListingsComponent } from './components/listings/listings.component';
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
    path: 'add',
    canActivate: [LoggedInGuard],
    component: AddListingComponent
  },
  {
    path: ':id',
    component: ListingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
