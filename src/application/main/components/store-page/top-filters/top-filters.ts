import './top-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ToggleGrid } from './toggle-grid/toggle-grid';
import { Search } from './search/search';
import { SelectSort } from './select-sort/select-sort';
import { SortService } from '../../../services/store-page/filters/sort.service';
import { ListView } from '../items/list-view/list-view';
import { GridView } from '../items/grid-view/grid-view';

export class TopFilters extends DOMElement {
  private topFiltersToggle: DOMElement;
  private topFiltersSearch: DOMElement;
  private topFiltersSelect: DOMElement;

  private toggleGrid: ToggleGrid;
  private search: Search;
  private select: SelectSort;
  private view: GridView | ListView | null;

  constructor(parentNode: HTMLElement, render: GridView | ListView | null) {
    super(parentNode, {
      tagName: 'div',
      classList: ['top-filters'],
    });

    this.topFiltersToggle = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['top-filters__toggle'],
    });

    this.topFiltersSearch = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['top-filters__search'],
    });

    this.topFiltersSelect = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['top-filters__select'],
    });

    this.toggleGrid = new ToggleGrid(this.topFiltersToggle.node);
    this.search = new Search(this.topFiltersSearch.node);
    this.select = new SelectSort(this.topFiltersSelect.node);
    this.view = render;
    this.listen();
  }

  private listen() {
    this.node.addEventListener('click', (e: Event) => {
      if (
        (e.target as HTMLElement).closest('.select-sort__input') &&
        (e.target as HTMLInputElement).value !== 'default'
      ) {
        const newState = SortService.sort((e.target as HTMLInputElement).value);
        if (newState) {
          (this.view as GridView).render(newState);
        }
      }
    });
  }
}
