import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ResponseData } from '../../../../shared/models/response-data';
import './items.scss';
import { CartList } from './list/cart-list';
import { Pagination } from './pagination/pagination';

export class CartItems extends DOMElement {
  private pagination: Pagination;
  private list: CartList;

  constructor(parentNode: HTMLElement, data: ResponseData) {
    super(parentNode, {
      tagName: 'div',
      classList: ['cart-items'],
    });

    this.pagination = new Pagination(this.node, data);
    this.list = new CartList(this.node, data);
  }
}
