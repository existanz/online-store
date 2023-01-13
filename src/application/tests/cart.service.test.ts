import { CartService } from '../main/services/cart-page/cart.service';
import MOCK_PRODUCTS from './mock.products';
//jest.mock('../main/services/cart-page/cart.service');

//const mockCartService = jest.fn();
//console.log(mockCartService);
const cartService = new CartService();
//console.log(cartService);

describe('PromoCodes testing', () => {
  it('activate promo', () => {
    cartService.activePromo = [];
    const len = cartService.activePromo.length;
    cartService.activatePromo('RS');
    const result: string = cartService.activePromo[0];
    const expected = 'RS';
    expect(result).toBe(expected);
    cartService.activatePromo('RS');
    expect(cartService.activePromo.length).toBe(len + 1);
    cartService.activatePromo('EPAM');
    expect(cartService.activePromo.length).toBe(len + 2);
    cartService.activatePromo('WRONG');
    expect(cartService.activePromo.length).toBe(len + 2);
  }),
    it('deactivate promo', () => {
      const len = cartService.activePromo.length;
      cartService.deactivatePromo('WRONG');
      expect(cartService.activePromo.length).toBe(len);
      cartService.deactivatePromo('RS');
      expect(cartService.activePromo.length).toBe(len - 1);
      cartService.deactivatePromo('EPAM');
      expect(cartService.activePromo.length).toBe(len - 2);
    }),
    it('is Promo?', () => {
      expect(cartService.isPromo('WRONG')).toBe(false);
      expect(cartService.isPromo('RS')).toBe(true);
      expect(cartService.isPromo('EPAM')).toBe(true);
    }),
    it('is active Promo?', () => {
      expect(cartService.isActivePromo('WRONG')).toBe(false);
      expect(cartService.isActivePromo('RS')).toBe(false);
      expect(cartService.isActivePromo('EPAM')).toBe(false);
      cartService.activatePromo('RS');
      cartService.activatePromo('EPAM');
      expect(cartService.isActivePromo('RS')).toBe(true);
      expect(cartService.isActivePromo('EPAM')).toBe(true);
    });
});
