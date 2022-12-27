import './main-container.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';

export class Main extends DOMElement {
  private mainContainer: DOMElement;
  public container: HTMLElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'main',
      classList: ['main'],
    });

    this.mainContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['container', 'main__container'],
    });
    this.container = this.mainContainer.node;
  }
}
