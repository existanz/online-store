import { NotFoundPage } from '../../main/pages/not-found/not-found';
import { ProductPage } from '../../main/pages/product-page/product-page';
import { StorePage } from '../../main/pages/store-page/store-page';
import { CartPage } from '../../main/pages/cart-page/cart-page';
import RouterService from '../services/router.service';
import { State } from '../../shared/services/state.service';

export class Router {
  private parentNode: HTMLElement;

  private store: StorePage;
  private product: ProductPage;
  private notFoundPage: NotFoundPage;
  private cart: CartPage;

  private routerService: RouterService;

  constructor(parentNode: HTMLElement) {
    this.parentNode = parentNode;

    this.store = new StorePage('store-page', State.current);
    this.product = new ProductPage('product-page', State.allData[0]);
    this.notFoundPage = new NotFoundPage('not-found-page');
    this.cart = new CartPage('cart-page');

    this.routerService = new RouterService();

    this.render(this.routerService.routChange().idPage);
    window.addEventListener('hashchange', () => this.render(this.routerService.routChange().idPage));
  }

  public render(idPage: string) {
    this.parentNode.innerHTML = '';
    switch (idPage) {
      case 'store':
        this.parentNode.append(this.store.node);
        break;
      case '':
        this.parentNode.append(this.store.node);
        break;
      case 'product':
        this.product = new ProductPage('product-page', State.getProductByID(this.routerService.getProdId()));
        this.parentNode.append(this.product.node);
        break;
      case 'cart':
        this.cart = new CartPage('cart-page');
        this.parentNode.append(this.cart.node);
        break;
      default:
        this.parentNode.append(this.notFoundPage.node);
    }
  }
}
