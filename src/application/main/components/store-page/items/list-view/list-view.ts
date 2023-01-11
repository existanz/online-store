import './list-view.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { ListCard } from './list-card/list-card';
import { NotFoundPage } from '../../../../pages/not-found/not-found';

export class ListView extends DOMElement {
  private notFoundPage: NotFoundPage;

  constructor(parentNode: HTMLElement | null, data: ProductsData[] | null) {
    super(parentNode, {
      tagName: 'div',
      classList: ['list-view'],
    });
    this.notFoundPage = new NotFoundPage('not-found-page-items');

    if (data) {
      this.render(data);
    }
  }

  public render(data: ProductsData[]): void {
    const container = this.node;
    container.innerHTML = '';
    data.length ? data.map((item) => new ListCard(container, item)) : container.append(this.notFoundPage.node);
  }
}
