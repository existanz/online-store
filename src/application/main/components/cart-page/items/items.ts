import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../shared/models/response-data';
import { State } from '../../../../shared/services/state.service';
import cartService from '../../../services/cart-page/cart.service';
import './items.scss';
import { CartList } from './list/cart-list';
import { Pagination } from './pagination/pagination';

export class CartItems extends DOMElement {
  private pagination: Pagination;
  private emptyBag: DOMElement;

  constructor(parentNode: HTMLElement, data: ProductsData[]) {
    super(parentNode, {
      tagName: 'div',
      classList: ['cart-items'],
    });

    this.pagination = new Pagination(this.node, data);
    cartService.container = new CartList(this.node);
    this.emptyBag = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['cart-items__empty', 'cart-items__empty--visible'],
      content: 'There is no goods in bag. Please go to Store and buy something',
    });
    this.render();
  }

  public render() {
    if (State.cart.length == 0) this.emptyBag.node.classList.add('cart-items__empty--visible');
    else this.emptyBag.node.classList.remove('cart-items__empty--visible');
    this.pagination.render();
    (cartService.container as CartList).render();
  }
}
