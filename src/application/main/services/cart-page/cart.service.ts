import { ProductsData } from '../../../shared/models/response-data';
import LocalStorageSvc from '../../../shared/services/local-storage.service';
import { State } from '../../../shared/services/state.service';

export default abstract class CartService {
  static countsCart: number[] = [];
  private static totalCount = 0;
  private static totalSum = 0;
  private static localStorageSVC = new LocalStorageSvc();

  static addToCart(product: ProductsData) {
    const idInCart = State.cart.indexOf(product);

    if (idInCart >= 0) {
      console.log('уже есть', idInCart, this.countsCart[idInCart]);
      this.countsCart[idInCart]++;
    } else {
      State.cart.push(product);
      this.countsCart.push(1);
      console.log('добавил');
    }

    this.totalCount++;
    this.totalSum += product.price;
    this.localStorageSVC.setRecord('cart', State.cart);
    this.localStorageSVC.setRecord('cartCounts', this.countsCart);
    console.log(this.getTotalCount(), this.getTotalSum());
  }

  static removeFromCart(product: ProductsData) {
    const idInCart = State.cart.indexOf(product);

    if (idInCart >= 0) {
      if (this.countsCart[idInCart] > 1) {
        this.countsCart[idInCart]--;
        console.log('уменьшил количество', this.countsCart[idInCart]);
      } else {
        State.cart.splice(idInCart, 1);
        this.countsCart.splice(idInCart, 1);
        console.log('удалил из корзины', State.cart);
      }
    }
    this.localStorageSVC.setRecord('cart', State.cart);
    this.localStorageSVC.setRecord('cartCounts', this.countsCart);
  }

  static getTotalSum() {
    return this.totalSum;
  }

  static getTotalCount() {
    return this.totalCount;
  }
}
