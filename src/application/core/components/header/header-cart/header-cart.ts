import './header-cart.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';

export class Cart extends DOMElement {
  private counter: DOMElement;
  private text: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'a',
      href: '#',
      classList: ['cart-counter'],
    });

    this.node.innerHTML = `<svg width="30" height="33" viewBox="0 0 30 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="cart-counter__icon" d="M5.55558 0.888885L0.888916 7.11111V28.8889C0.888916 29.714 1.21669 30.5053 1.80014 31.0888C2.38359 31.6722 3.17491 32 4.00003 32H25.7778C26.6029 32 27.3942 31.6722 27.9777 31.0888C28.5611 30.5053 28.8889 29.714 28.8889 28.8889V7.11111L24.2223 0.888885H5.55558Z" stroke="#1F2937" stroke-linejoin="round"/>
      <path class="cart-counter__icon" d="M0.888916 7.11162H28.8889" stroke="#1F2937" stroke-linejoin="round"/>
      <path class="cart-counter__icon" d="M21.1111 13.3331C21.1111 14.9833 20.4556 16.566 19.2887 17.7329C18.1218 18.8998 16.5391 19.5553 14.8889 19.5553C13.2387 19.5553 11.656 18.8998 10.4891 17.7329C9.32224 16.566 8.66669 14.9833 8.66669 13.3331" stroke="#1F2937" stroke-linejoin="round"/>
    </svg>`;

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

  private setCount(count: number): void {
    this.counter.node.innerText = `${count}`;
  }

  public updateCount(): void {
    // чекаем данные в корзине и обновляем, если нужно
    if (this.counter.node.innerText === '0') {
      this.counter.node.classList.add('cart-counter__count--hidden');
    } else {
      this.counter.node.classList.remove('cart-counter__count--hidden');
    }
  }
}
