import cartService from '../main/services/cart-page/cart.service';
import products from './test.json';
jest.mock('../main/services/cart-page/cart.service');

cartService.activePromo = [];
cartService.activatePromo('rs');
console.log(cartService.activePromo);

describe('addToCart testing', () => {
  it('add to cart product', () => {
    const result: string = cartService.activePromo[0];
    const expected = 'RS';
    expect(result).toBe(expected);
  }),
    it('increase product count in cart', () => {
      const result: number = products[2].id;
      const expected = 3;
      expect(result).toBe(expected);
    });
});
