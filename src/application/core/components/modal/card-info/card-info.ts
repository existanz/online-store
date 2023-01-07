import { DOMElement } from '../../../../shared/components/base-elements/dom-element';

export class CardInfo extends DOMElement {
  private title: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['card-info'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['personal-info__asdasde'],
      content: 'Card details',
    });
  }
}
