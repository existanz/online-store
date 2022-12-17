import './header.scss';
import { DOMElement } from '../../../shared/components/DOMElement';
import { Logo } from './header-logo/header-logo';
import { TotalPrice } from './header-total-price/header-total-price';

export class Header extends DOMElement {
  constructor(parentNode: HTMLElement) {
    super(parentNode, { tagName: 'header', classList: ['header'] });
    this.render();
  }

  private render(): void {
    const container = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['container', 'header__container']
    });
    const headerLogo = new DOMElement(container.node, {
      tagName: 'div',
      classList: ['header__logo']
    });
    const nav = new DOMElement(container.node, {
      tagName: 'div',
      classList: ['header__navigation']
    });
    const headerTotalPrice = new DOMElement(container.node, {
      tagName: 'div',
      classList: ['header__total-price']
    });
    const headerCart = new DOMElement(container.node, {
      tagName: 'div',
      classList: ['header__cart']
    });
    const logo = new Logo(headerLogo.node);
    const price = new TotalPrice(headerTotalPrice.node);
  }
}
