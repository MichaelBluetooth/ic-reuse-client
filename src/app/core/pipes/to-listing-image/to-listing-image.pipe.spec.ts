import { environment } from 'src/environments/environment';
import { ToListingImagePipe } from './to-listing-image.pipe';

describe('ToListingImagePipe', () => {
  it('create an instance', () => {
    const listingImageId = '12345';
    const pipe = new ToListingImagePipe();
    expect(pipe.transform(listingImageId)).toEqual(`${environment.baseUrl}listingimages/${listingImageId}`);
  });
});
