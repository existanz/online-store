import './store-page.scss';
import { Page } from '../../../shared/components/page';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { TopFilters } from '../../components/store-page/top-filters/top-filters';
import { LeftFilters } from '../../components/store-page/left-filters/left-filters';
import { GridView } from '../grid-view/grid-view';
// import { ListView } from '../list-view/list-view';

export class StorePage extends Page {
  private storeTopFilters: DOMElement;
  private storeAsideFilters: DOMElement;
  private storeItems: DOMElement;

  private topFilters: TopFilters;
  private leftFilters: LeftFilters;
  private gridView: GridView | null;
  // private listView: ListView;
  public response: Response | null;

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

    // описать данные
    // временный запрос данных
    this.response = null;
    this.loadTmpData();

    this.topFilters = new TopFilters(this.storeTopFilters.node);
    this.leftFilters = new LeftFilters(this.storeAsideFilters.node);
    this.gridView = null;
    // this.listView = new ListView(this.storeItems.node);
  }

  private async loadTmpData() {
    const url = 'https://dummyjson.com/products?limit=10';
    await fetch(url)
      .then((res) => res.json())
      .then((data) => (this.response = data));
    this.gridView = new GridView(this.storeItems.node, this.response);
  }
}
