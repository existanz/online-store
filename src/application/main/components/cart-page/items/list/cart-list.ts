import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { CartItem } from './cart-item';
import './cart-list.scss';

export class CartList extends DOMElement {
  constructor(parentNode: HTMLElement, data?: ProductsData[]) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['cart-list'],
    });

    if (data) {
      this.render(data);
    }
  }

  public render(data: ProductsData[]) {
    data.map((product, index) => new CartItem(this.node, product, index));
  }
}
