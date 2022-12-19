import './main-container.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';

export class Main {
  public main: DOMElement;
  public container: DOMElement;

  constructor(parentNode: HTMLElement) {
    this.main = new DOMElement(parentNode, {
      tagName: 'main',
      classList: ['main'],
    });
    this.container = new DOMElement(this.main.node, {
      tagName: 'div',
      classList: ['container', 'main__container'],
    });
  }
}
