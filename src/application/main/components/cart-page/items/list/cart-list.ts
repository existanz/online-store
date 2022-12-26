import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ResponseData } from '../../../../../shared/models/response-data';
import { ProductListService } from '../../../../services/cart-page/products-list.service';
import './cart-list.scss';

export class CartList extends DOMElement {
  constructor(parentNode: HTMLElement, data?: ResponseData) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['cart-list'],
    });

    ProductListService.renderList(this.node, data);
  }
}
