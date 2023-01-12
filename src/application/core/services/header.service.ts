import { Cart } from '../components/header/header-cart/header-cart';
import { TotalPrice } from '../components/header/header-total-price/header-total-price';

class HeaderService {
  public cart: null | Cart;
  public price: null | TotalPrice;

  constructor() {
    this.cart = null;
    this.price = null;
  }

  public update() {
    this.cart?.updateCount();
    this.price?.updatePrice();
  }
}

const headerService = new HeaderService();
export default headerService;
