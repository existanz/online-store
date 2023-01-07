import './list-view.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { ListCard } from './list-card/list-card';
import { NotFoundPage } from '../../../../pages/not-found/not-found';

export class ListView {
  public listView: DOMElement;
  private notFoundPage: NotFoundPage;

  constructor(parentNode: HTMLElement | null, data: ProductsData[] | null) {
    this.notFoundPage = new NotFoundPage('not-found-page-items');
    this.listView = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['list-view'],
    });

    if (data) {
      this.render(data);
    }
  }

  public render(data: ProductsData[]): void {
    const container = this.listView.node;
    container.innerHTML = '';
    if (data.length) {
      data.map((item) => new ListCard(container, item));
    } else {
      container.append(this.notFoundPage.node);
    }
  }
}
