import './top-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ToggleGrid } from './toggle-grid/toggle-grid';
import { Search } from './search/search';
import { SelectSort } from './select-sort/select-sort';
import sortService from '../../../services/store-page/filters/sort.service';
import searchService from '../../../services/store-page/filters/search.service';
import rangeFilterService from '../../../services/store-page/filters/range-filters.service';
import updateData from '../../../services/store-page/update-view.service';
import checkboxFilterService from '../../../services/store-page/filters/checkbox-filters.service';
import { LeftFilters } from '../left-filters/left-filters';
import viewService from '../../../services/store-page/change-view.service';
import { Querry } from '../../../../shared/services/querry.service';

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
        const newState = sortService.sort((e.target as HTMLInputElement).value);
        if (newState) {
          viewService.view.render(newState);
          Querry.updateQuerry();
        }
      }
    });

    this.node.addEventListener('input', (e: Event) => {
      if ((e.target as HTMLElement).closest('.search__input')) {
        rangeFilterService.pickData(e, 'price');
        rangeFilterService.pickData(e, 'stock');
        let newState = updateData.updateStock();
        newState = updateData.updatePrice();
        newState = updateData.update();
        newState = searchService.search((e.target as HTMLInputElement).value);
        viewService.view.render(newState);

        const brandData = {
          title: 'Brand',
          data: checkboxFilterService.pickBrand(newState),
        };
        this.leftFilters.checkboxBrand.render(brandData);

        const categoryData = {
          title: 'Category',
          data: checkboxFilterService.pickCategory(newState),
        };
        this.leftFilters.checkboxCategory.render(categoryData);
        updateData.updateProductCounter();

        this.leftFilters.updateMinMaxPrice();
        this.leftFilters.updateMinMaxStock();
      }
    });

    this.node.addEventListener('change', (e: Event) => {
      if ((e.target as HTMLElement).closest('.search__input')) {
        Querry.updateQuerry();
      }
    });
  }
}
