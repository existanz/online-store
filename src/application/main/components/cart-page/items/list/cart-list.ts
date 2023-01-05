import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { CartItem } from './cart-item';
import { State } from '../../../../../shared/services/state.service';
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
    this.node.addEventListener('click', () => this.render(State.cart));
  }

  public render(data: ProductsData[]) {
    this.node.innerHTML = '';
    data.map((product, index) => new CartItem(this.node, product, index));
  }
}
