import './store-page.scss';
import { Page } from '../../../shared/components/page';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { TopFilters } from '../../components/store-page/top-filters/top-filters';
import { LeftFilters } from '../../components/store-page/left-filters/left-filters';

export class StorePage extends Page {
  private storeTopFilters: DOMElement;
  private storeAsideFilters: DOMElement;
  private storeItems: DOMElement;

  private topFilters: TopFilters;
  private leftFilters: LeftFilters;

  constructor(id: string) {
    super(id);

    this.storeTopFilters = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['store-page__top-filters'],
    });

    this.storeAsideFilters = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['store-page__aside-filters'],
    });

    this.storeItems = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['store-page__store-items'],
    });

    this.topFilters = new TopFilters(this.storeTopFilters.node);
    this.leftFilters = new LeftFilters(this.storeAsideFilters.node);
  }
}
