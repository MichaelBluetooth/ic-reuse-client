import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { PricePipe } from './pipes/price/price.pipe';
import { ToListingImagePipe } from './pipes/to-listing-image/to-listing-image.pipe';

@NgModule({
  declarations: [
    AlertComponent,
    LoginComponent,
    PricePipe,
    ToListingImagePipe
  ],
  exports: [
    AlertComponent,
    LoginComponent,
    PricePipe,
    ToListingImagePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
