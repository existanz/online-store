import './header-total-price.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import CartService from '../../../../main/services/cart-page/cart.service';

export class TotalPrice extends DOMElement {
  private text: DOMElement;
  private price: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['total-price'],
    });

    this.text = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['total-price__text'],
      content: 'Total price:',
    });

    this.price = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['total-price__price'],
      content: '$9999999',
    });

    this.updatePrice();
  }

  public updatePrice(): void {
    this.price.node.textContent = `$${CartService.getTotalSum()}`;
  }
}
