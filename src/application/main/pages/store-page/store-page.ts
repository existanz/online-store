import './store-page.scss';
import { Page } from '../../../shared/components/page';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { TopFilters } from '../../components/store-page/top-filters/top-filters';
import { LeftFilters } from '../../components/store-page/left-filters/left-filters';
import { GridView } from '../../components/store-page/items/grid-view/grid-view';
import { ListView } from '../../components/store-page/items/list-view/list-view';
import { ProductsData } from '../../../shared/models/response-data';

export class StorePage extends Page {
  private storeTopFilters: DOMElement;
  private storeAsideFilters: DOMElement;
  private storeItems: DOMElement;

  private topFilters: TopFilters;
  private leftFilters: LeftFilters;
  private gridView: GridView | null;
  private listView: ListView | null;

  constructor(id: string, data: ProductsData[]) {
    super(id);

    this.storeTopFilters = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['store-page__top-filters'],
    });

    this.storeAsideFilters = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['store-page__aside-filters'],
    });

    this.storeItems = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['store-page__store-items'],
    });

    this.topFilters = new TopFilters(this.storeTopFilters.node);
    this.leftFilters = new LeftFilters(this.storeAsideFilters.node, data);

    // временный запрос данных
    this.gridView = new GridView(this.storeItems.node, data);
    this.listView = null;
  }
}
