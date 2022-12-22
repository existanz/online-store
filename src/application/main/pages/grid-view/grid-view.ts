import './grid-view.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';

export class GridView {
  private gridView: DOMElement;

  constructor(parentNode: HTMLElement, data: Response | null) {
    this.gridView = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['grid-view'],
    });
    // описать данные в models, вызвать функцию рендера
    console.log(data);
  }
}
