import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { CartItem } from './cart-item';
import stateService from '../../../../../shared/services/state.service';
import './cart-list.scss';
import PaginationService from '../../../../services/cart-page/pagination.service';

export class CartList extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['cart-list'],
    });

    this.render();
    this.node.addEventListener('click', () => this.render());
  }

  public render() {
    this.node.innerHTML = '';
    if (PaginationService.getCurPageProducts(stateService.cart).length == 0 && PaginationService.curPage > 1)
      PaginationService.curPage--;
    PaginationService.getCurPageProducts(stateService.cart).map(
      (product, index) =>
        new CartItem(this.node, product, index + PaginationService.productsPerPage * (PaginationService.curPage - 1))
    );
  }
}
