import { ProductsData } from '../../../shared/models/response-data';
import { State } from '../../../shared/services/state.service';

export default class Cart {
  static countsCart: number[] = [];

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
  }
}
