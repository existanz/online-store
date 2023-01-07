import './top-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ToggleGrid } from './toggle-grid/toggle-grid';
import { Search } from './search/search';
import { SelectSort } from './select-sort/select-sort';
import { SortService } from '../../../services/store-page/filters/sort.service';
import { SearchService } from '../../../services/store-page/filters/search.service';
import { RangeFilterService } from '../../../services/store-page/filters/range-filters.service';
import { UpdateData } from '../../../services/store-page/update-view.service';
import { CheckboxFilterService } from '../../../services/store-page/filters/checkbox-filters.service';
import { LeftFilters } from '../left-filters/left-filters';
import { ViewService } from '../../../services/store-page/change-view.service';

export class TopFilters extends DOMElement {
  private topFiltersToggle: DOMElement;
  private topFiltersSearch: DOMElement;
  private topFiltersSelect: DOMElement;

  private toggleGrid: ToggleGrid;
  private search: Search;
  private select: SelectSort;
  private leftFilters: LeftFilters;

  constructor(parentNode: HTMLElement, leftFilters: LeftFilters) {
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
          ViewService.view.render(newState);
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
        ViewService.view.render(newState);

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

        this.leftFilters.updateMinMaxPrice();
        this.leftFilters.updateMinMaxStock();
      }
    });
  }
}
