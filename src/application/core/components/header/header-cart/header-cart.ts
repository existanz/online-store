import './header-cart.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { LinkElement } from '../../../../shared/components/base-elements/link-element';
import { SVG } from '../../../../shared/components/svg-icons';
import CartService from '../../../../main/services/cart-page/cart.service';

export class Cart extends LinkElement {
  private counter: DOMElement;
  private text: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'a',
      href: '#cart',
      classList: ['cart-counter'],
    });

    this.node.innerHTML = SVG.bug;

    this.counter = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['cart-counter__count'],
      content: '0',
    });

    this.text = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['cart-counter__text'],
      content: 'Bag',
    });
    this.updateCount();
  }

  private setCount(): void {
    this.counter.node.innerText = `${CartService.getTotalCount()}`;
  }

  public updateCount(): void {
    this.setCount();
    this.counter.node.innerText === '0'
      ? this.counter.node.classList.add('cart-counter__count--hidden')
      : this.counter.node.classList.remove('cart-counter__count--hidden');
  }
}
