import './header-logo.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { LinkElement } from '../../../../shared/components/base-elements/link-element';

export class Logo extends LinkElement {

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'a',
      href: '#store',
      classList: ['logo-link'],
      content: 'Store',
    });
  }
}
