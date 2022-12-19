import './nav.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { LinkElement } from '../../../../shared/components/base-elements/link-element';

export class Navigation {
  private list: DOMElement;

  private linksInfo = [
    {
      content: 'main page',
      href: '/',
    },
    {
      content: 'item page',
      href: '/item',
    },
    {
      content: 'cart',
      href: '/cart',
    },
    {
      content: '404',
      href: '/404',
    },
  ];

  constructor(parentNode: HTMLElement) {
    this.list = new DOMElement(parentNode, {
      tagName: 'ul',
      classList: ['tmp-nav'],
    });

    let item: DOMElement;
    let link: DOMElement;
    for (let i = 0; i < this.linksInfo.length; i++) {
      item = new DOMElement(this.list.node, {
        tagName: 'li',
        classList: ['tmp-nav__item'],
      });

      link = new LinkElement(item.node, {
        tagName: 'a',
        classList: ['tmp-nav__link'],
        href: this.linksInfo[i].href,
        content: this.linksInfo[i].content,
      });
      link.node.addEventListener('click', (e) => e.preventDefault());
    }
  }
}
