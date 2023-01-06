import './grid-view.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { GridCard } from '../grid-card';
import { NotFoundPage } from '../../../../pages/not-found/not-found';

export class GridView {
  public gridView: DOMElement;
  private notFoundPage: NotFoundPage;

  constructor(parentNode: HTMLElement, data: ProductsData[] | null) {
    this.notFoundPage = new NotFoundPage('not-found-page-items');
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
    if (data.length) {
      data.map((item) => new GridCard(container, item));
    } else {
      container.append(this.notFoundPage.node);
    }
  }
}
