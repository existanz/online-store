import './top-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ToggleGrid } from './toggle-grid/toggle-grid';
import { Search } from './search/search';
import { SelectSort } from './select-sort/select-sort';

export class TopFilters extends DOMElement {
  private topFiltersToggle: DOMElement;
  private topFiltersSearch: DOMElement;
  private topFiltersSelect: DOMElement;

  private toggleGrid: ToggleGrid;
  private search: Search;
  private select: SelectSort;

  constructor(parentNode: HTMLElement) {
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
  }
}
