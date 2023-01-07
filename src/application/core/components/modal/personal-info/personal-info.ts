import { DOMElement } from '../../../../shared/components/base-elements/dom-element';

export class PersonalInfo extends DOMElement {
  private title: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['personal-info'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      classList: ['personal-info__title'],
      content: 'Personal details',
    });
  }
}
