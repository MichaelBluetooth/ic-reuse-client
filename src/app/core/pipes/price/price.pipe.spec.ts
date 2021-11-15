import { PricePipe } from './price.pipe';

describe('PricePipe', () => {
  it('create an instance', () => {
    const pipe = new PricePipe();
    expect(pipe.transform(10.24542)).toEqual('$10.25');
  });
});
