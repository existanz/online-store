import './grid-view.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { GridCard } from '../grid-card';

export class GridView {
  public gridView: DOMElement;

  constructor(parentNode: HTMLElement, data: ProductsData[] | null) {
    this.gridView = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['grid-view'],
    });

    if (data) {
      this.render(data);
    }
  }

  public render(data: ProductsData[]): void {
    const container = this.gridView.node;
    container.innerHTML = '';
    data.map((item) => new GridCard(container, item));
  }
}
