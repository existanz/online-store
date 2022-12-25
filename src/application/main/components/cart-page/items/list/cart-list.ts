import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ResponseData } from '../../../../../shared/models/response-data';
import './cart-list.scss';

export class CartList extends DOMElement {
  constructor(parentNode: HTMLElement, data: ResponseData) {
    super(parentNode, {
      tagName: 'div',
      classList: ['cart-list'],
    });
  }
}
