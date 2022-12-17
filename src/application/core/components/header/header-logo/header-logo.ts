import './header-logo.scss';
import { DOMElement } from '../../../../shared/components/dom-element';

export class Logo {
  private link: DOMElement;

  constructor(parentNode: HTMLElement) {
    this.link = new DOMElement(parentNode, {
      tagName: 'a',
      href: '/',
      classList: ['logo-link'],
      content: 'Store',
    });
  }
}
