import { CartService } from '../main/services/cart-page/cart.service';
import { State } from '../shared/services/state.service';
import MOCK_PRODUCTS from './mock.products';

const cartService = new CartService();

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

describe('Goods in cart testing', () => {
  it('add product to cart', () => {
    State.cart = [];
    cartService.addToCart(MOCK_PRODUCTS[0]);
    expect(State.cart.length).toBe(1);
    expect(State.cart[0].id).toBe(MOCK_PRODUCTS[0].id);
    cartService.addToCart(MOCK_PRODUCTS[0]);
    expect(State.cart.length).toBe(1);
    expect(cartService.countsCart[0]).toBe(2);
    cartService.addToCart(MOCK_PRODUCTS[0]);
    expect(State.cart.length).toBe(1);
    expect(cartService.countsCart[0]).toBe(3);
    cartService.addToCart(MOCK_PRODUCTS[4]);
    cartService.addToCart(MOCK_PRODUCTS[4]);
    cartService.addToCart(MOCK_PRODUCTS[4]);
    expect(State.cart.length).toBe(2);
    expect(cartService.countsCart[1]).toBe(3);
    expect(State.cart[1].id).toBe(MOCK_PRODUCTS[4].id);
  }),
    it('dont allow to add in cart more than stock', () => {
      for (let i = 1; i < 100; i++) cartService.addToCart(MOCK_PRODUCTS[7]);
      expect(State.cart.length).toBe(3);
      expect(cartService.countsCart[2]).toBe(MOCK_PRODUCTS[7].stock);
    }),
    it('index from cart if have', () => {
      expect(cartService.idInCart(MOCK_PRODUCTS[0])).toBe(0);
      expect(cartService.idInCart(MOCK_PRODUCTS[1])).toBe(-1);
      expect(cartService.idInCart(MOCK_PRODUCTS[4])).toBe(1);
      expect(cartService.idInCart(MOCK_PRODUCTS[8])).toBe(-1);
      cartService.addToCart(MOCK_PRODUCTS[8]);
      expect(cartService.idInCart(MOCK_PRODUCTS[8])).toBe(3);
    }),
    it('remove product from cart', () => {
      cartService.removeFromCart(MOCK_PRODUCTS[1]);
      expect(State.cart.length).toBe(3);
    }),
    it('remove all products same type', () => {
      expect('TODO').toBe('true');
    }),
    it('clear cart', () => {
      expect('TODO').toBe('true');
    });
});
