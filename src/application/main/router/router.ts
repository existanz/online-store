import { NotFoundPage } from '../../main/pages/not-found/not-found';
import { ProductPage } from '../../main/pages/product-page/product-page';
import { StorePage } from '../../main/pages/store-page/store-page';
import { CartPage } from '../../main/pages/cart-page/cart-page';
import RouterService from '../../shared/services/router.service';

export class Router {
  private parentNode: HTMLElement;

  private store: StorePage;
  private product: ProductPage;
  private notFoundPage: NotFoundPage;
  private cart: CartPage;

  private routerService: RouterService;

  constructor(parentNode: HTMLElement) {
    this.parentNode = parentNode;

    this.store = new StorePage('store-page');
    this.product = new ProductPage('product-page');
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
        this.parentNode.append(this.product.node);
        break;
      case 'cart':
        this.parentNode.append(this.cart.node);
        break;
      default:
        this.parentNode.append(this.notFoundPage.node);
    }
  }
}
