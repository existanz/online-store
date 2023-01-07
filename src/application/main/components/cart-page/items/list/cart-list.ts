import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { CartItem } from './cart-item';
import { State } from '../../../../../shared/services/state.service';
import './cart-list.scss';
import PaginationService from '../../../../services/cart-page/pagination.service';

export class CartList extends DOMElement {
  constructor(parentNode: HTMLElement, data?: ProductsData[]) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['cart-list'],
    });

    if (data) {
      this.render();
    }
    this.node.addEventListener('click', () => this.render());
  }

  public render() {
    this.node.innerHTML = '';
    if (PaginationService.getCurPageProducts(State.cart).length == 0 && PaginationService.curPage > 1)
      PaginationService.curPage--;
    PaginationService.getCurPageProducts(State.cart).map(
      (product, index) =>
        new CartItem(this.node, product, index + PaginationService.productsPerPage * (PaginationService.curPage - 1))
    );
  }
}
