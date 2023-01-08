import './header-logo.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { LinkElement } from '../../../../shared/components/base-elements/link-element';

export class Logo {
  private link: DOMElement;

  constructor(parentNode: HTMLElement) {
    this.link = new LinkElement(parentNode, {
      tagName: 'a',
      href: '#store',
      classList: ['logo-link'],
      content: 'Store',
    });
  }
}
