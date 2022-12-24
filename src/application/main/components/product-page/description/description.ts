import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../shared/models/response-data';

export class Description extends DOMElement {
  private title: DOMElement;

  constructor(parentNode: HTMLElement, data: ProductsData) {
    super(parentNode, {
      tagName: 'div',
      classList: ['description'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h1',
      classList: ['description__title'],
      content: data.title,
    });
  }
}
