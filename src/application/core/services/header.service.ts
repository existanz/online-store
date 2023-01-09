import { Cart } from '../components/header/header-cart/header-cart';
import { TotalPrice } from '../components/header/header-total-price/header-total-price';

export abstract class HeaderService {
  static price: TotalPrice;
  static cart: Cart;

  static update() {
    HeaderService.cart.updateCount();
    HeaderService.price.updatePrice();
  }
}
