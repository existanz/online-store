import { NotFoundPage } from '../../main/pages/not-found/not-found';
import { ProductPage } from '../../main/pages/product-page/product-page';
import { StorePage } from '../../main/pages/store-page/store-page';
import { CartPage } from '../../main/pages/cart-page/cart-page';

export default class PageRenderer {
  private store: StorePage;
  private product: ProductPage;
  private notFoundPage: NotFoundPage;
  private cart: CartPage;
  private parentNode: HTMLElement;

  constructor(parentNode: HTMLElement) {
    this.store = new StorePage('store-page');
    this.product = new ProductPage('product-page');
    this.notFoundPage = new NotFoundPage('404-page');
    this.cart = new CartPage('cart-page');
    this.parentNode = parentNode;
  }

  public render(idPage: string) {
    this.parentNode.innerHTML = '';
    switch (idPage) {
      case 'store':
        this.parentNode.append(this.store.container.node);
        break;
      case '':
        this.parentNode.append(this.store.container.node);
        break;
      case 'product':
        this.parentNode.append(this.product.container.node);
        break;
      case 'cart':
        this.parentNode.append(this.cart.container.node);
        break;
      default:
        this.parentNode.append(this.notFoundPage.container.node);
    }
  }
}
