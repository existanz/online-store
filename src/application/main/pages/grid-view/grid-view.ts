import './grid-view.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { ResponseData } from '../../../shared/models/response-data';
import { GridCard } from '../../components/store-page/items/grid-card';

export class GridView {
  private gridView: DOMElement;

  constructor(parentNode: HTMLElement, data: ResponseData | null) {
    this.gridView = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['grid-view'],
    });

    if (data) {
      this.render(data);
    }
  }

  public render(data: ResponseData): void {
    const container = this.gridView.node;
    data.products.map((item) => new GridCard(container, item));
  }
}
