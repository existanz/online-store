import { ProductPage } from '../../main/pages/product-page/product-page';
import { StorePage } from '../../main/pages/store-page/store-page';

export default class PageRenderer {
  private store: StorePage;
  private product: ProductPage;
  private parentNode: HTMLElement;

  constructor(parentNode: HTMLElement) {
    this.store = new StorePage('store-page');
    this.product = new ProductPage('product-page');
    this.parentNode = parentNode;
  }

  public render(idPage: string) {
    this.parentNode.innerHTML = '';
    if (idPage === 'store') this.parentNode.append(this.store.container.node);
    if (idPage === 'product') this.parentNode.append(this.product.container.node);
  }
}
