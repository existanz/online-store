import { ProductsData } from '../../../shared/models/response-data';
import LocalStorageSvc from '../../../shared/services/local-storage.service';
import { State } from '../../../shared/services/state.service';

export default abstract class CartService {
  static countsCart: number[] = [];
  static promoList: PromoList = { RS: 10, EPAM: 10 };
  static activePromo: Promo[] = ['RS', 'EPAM'];
  private static totalCount = 0;
  private static totalSum = 0;
  private static curSum = 0;
  private static localStorageSVC = new LocalStorageSvc();

  static addToCart(product: ProductsData) {
    const idInCart = this.idInCart(product);

    if (idInCart >= 0) {
      console.log('увеличил количество', this.countsCart[idInCart]);
      this.countsCart[idInCart]++;
    } else {
      State.cart.push(product);
      this.countsCart.push(1);
      console.log('добавил');
    }
    console.log(Object.keys(this.promoList), this.promoList[this.activePromo[0]], this.activePromo[1] == 'EPAM');
    this.totalCount++;
    this.totalSum += product.price;
    this.save();
  }

  static removeFromCart(product: ProductsData) {
    const idInCart = this.idInCart(product);

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
    this.totalCount--;
    this.totalSum -= product.price;
    this.save();
  }

  static getTotalSum() {
    return this.totalSum;
  }

  static getTotalCount() {
    return this.totalCount;
  }

  static save() {
    this.localStorageSVC.setRecord('cart', { cart: State.cart, counts: this.countsCart, promo: this.activePromo });
  }

  static load() {
    const cartLoad = { cart: [], counts: [], promo: [] };
    if (this.localStorageSVC.getRecordObj('cart')) {
      Object.assign(cartLoad, this.localStorageSVC.getRecordObj('cart'));
      cartLoad.cart.forEach((product: ProductsData, id) => {
        State.cart.push(State.getProductByID(product.id));
        this.totalSum += product.price * cartLoad.counts[id];
      });
      this.countsCart = cartLoad.counts;
      if (this.countsCart.length > 0) this.totalCount = this.countsCart.reduce((acc, cur) => acc + cur);
      this.activePromo = cartLoad.promo;
    }
  }

  static idInCart(product: ProductsData) {
    const idInCart = State.cart.indexOf(product);
    return idInCart;
  }

  static activatePromo(promo: string) {
    if (this.isPromo(promo) && !this.isActivePromo(promo)) this.activePromo.push(promo as Promo);
    console.log(this.isPromo(promo), this.isActivePromo(promo), this.activePromo);
    this.save();
  }

  static deactivatePromo(promo: string) {
    const index = this.activePromo.indexOf(promo as Promo);
    if (index >= 0) this.activePromo.splice(index, 1);
    this.save();
  }

  static isPromo(promo: string) {
    return promo.toLocaleUpperCase() === 'RS' || promo.toLocaleUpperCase() === 'EPAM';
  }

  static isActivePromo(promo: string) {
    return this.activePromo.includes(promo.toLocaleUpperCase() as Promo);
  }
}

type Promo = 'RS' | 'EPAM';
type PromoList = Record<Promo, number>;
