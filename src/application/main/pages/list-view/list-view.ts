import './list-view.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';

export class ListView {
  private listView: DOMElement;

  constructor(parentNode: HTMLElement) {
    this.listView = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['list-view'],
    });
  }
}
