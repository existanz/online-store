import './toggle-grid.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { SVG } from '../../../../../shared/components/svg-icons';

export class ToggleGrid extends DOMElement {
  public toggleGridItemGrid: ButtonElement;
  public toggleGridItemList: ButtonElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['toggle-grid'],
    });

    this.toggleGridItemGrid = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['toggle-grid__item'],
    });
    this.toggleGridItemGrid.node.innerHTML = SVG.gridView;

    this.toggleGridItemList = new ButtonElement(this.node, {
      tagName: 'button',
      classList: ['toggle-grid__item'],
    });
    this.toggleGridItemList.node.innerHTML = SVG.listView;
  }
}
