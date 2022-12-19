import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { SVG } from '../../../../../shared/components/svg-icons';

export class ToggleGrid {
  private toggleGrid: DOMElement;
  private toggleGridItem: ButtonElement;

  constructor(parentNode: HTMLElement) {
    this.toggleGrid = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['toggle-grid'],
    });

    this.toggleGridItem = new ButtonElement(this.toggleGrid.node, {
      tagName: 'button',
      classList: ['toggle-grid__item'],
    });
    this.toggleGridItem.node.innerHTML = SVG.gridView;

    this.toggleGridItem = new ButtonElement(this.toggleGrid.node, {
      tagName: 'button',
      classList: ['toggle-grid__item'],
    });
    this.toggleGridItem.node.innerHTML = SVG.listView;
  }
}
