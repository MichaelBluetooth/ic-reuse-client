import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'toListingImage'
})
export class ToListingImagePipe implements PipeTransform {
  transform(listingImageId: string): unknown {
    return `${environment.baseUrl}listingimages/${listingImageId}`;
  }
}
