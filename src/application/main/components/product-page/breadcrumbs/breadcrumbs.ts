import './breadcrumbs.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { LinkElement } from '../../../../shared/components/base-elements/link-element';
import { ProductsData } from '../../../../shared/models/response-data';

export class Breadcrumbs extends DOMElement {
  private store: LinkElement;
  private category: DOMElement;
  private brand: DOMElement;
  private title: DOMElement;

  constructor(parentNode: HTMLElement, data: ProductsData) {
    super(parentNode, {
      tagName: 'div',
      classList: ['breadcrumbs'],
    });

    this.store = new LinkElement(this.node, {
      tagName: 'a',
      href: '/#store',
      classList: ['breadcrumbs__store'],
      content: 'Store',
    });

    this.category = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['breadcrumbs__category'],
      content: data.category,
    });

    this.brand = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['breadcrumbs__brand'],
      content: data.brand,
    });

    this.title = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['breadcrumbs__title'],
      content: data.title,
    });
  }
}
