import './top-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ToggleGrid } from './toggle-grid/toggle-grid';
import { Search } from './search/search';
import { SelectSort } from './select-sort/select-sort';
import { SortService } from '../../../services/store-page/filters/sort.service';
import { ListView } from '../items/list-view/list-view';
import { GridView } from '../items/grid-view/grid-view';
import { SearchService } from '../../../services/store-page/filters/search.service';
import { RangeFilterService } from '../../../services/store-page/filters/range-filters.service';
import { UpdateData } from '../../../services/store-page/update-view.service';
import { CheckboxFilterService } from '../../../services/store-page/filters/checkbox-filters.service';
import { LeftFilters } from '../left-filters/left-filters';

export class TopFilters extends DOMElement {
  private topFiltersToggle: DOMElement;
  private topFiltersSearch: DOMElement;
  private topFiltersSelect: DOMElement;

  private toggleGrid: ToggleGrid;
  private search: Search;
  private select: SelectSort;
  private view: GridView | ListView | null;
  private leftFilters: LeftFilters;

  constructor(parentNode: HTMLElement, render: GridView | ListView | null, leftFilters: LeftFilters) {
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
    this.leftFilters = leftFilters;
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

    this.node.addEventListener('input', (e: Event) => {
      if ((e.target as HTMLElement).closest('.search__input')) {
        RangeFilterService.pickData(e, 'price');
        RangeFilterService.pickData(e, 'stock');
        let newState = UpdateData.updateStock();
        newState = UpdateData.updatePrice();
        newState = UpdateData.update();
        newState = SearchService.search((e.target as HTMLInputElement).value);
        (this.view as GridView).render(newState);

        const brandData = {
          title: 'Brand',
          data: CheckboxFilterService.pickBrand(newState),
        };
        this.leftFilters.checkboxBrand.render(brandData);

        const categoryData = {
          title: 'Category',
          data: CheckboxFilterService.pickCategory(newState),
        };
        this.leftFilters.checkboxCategory.render(categoryData);
        UpdateData.updateProductCounter();
      }
    });
  }
}
