import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(price: number): unknown {
    return `$${price.toFixed(2)}`;
  }
}
