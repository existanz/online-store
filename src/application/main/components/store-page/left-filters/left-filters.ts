import './left-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { CheckboxFilter } from './checkbox-filters/checkbox-filter';
import { RangeFilter } from './range-filters/range-filter';
import { WhiteButton } from '../../../../shared/components/buttons/white-button';
import { BlueButton } from '../../../../shared/components/buttons/blue-button';
import { ProductsData } from '../../../../shared/models/response-data';
import { CheckboxFilterService } from '../../../services/store-page/filters/checkbox-filters.service';
import { RangeFilterService } from '../../../services/store-page/filters/range-filters.service';
import { UpdateData } from '../../../services/store-page/update-view.service';
import { State } from '../../../../shared/services/state.service';

export class LeftFilters extends DOMElement {
  public checkboxCategory: CheckboxFilter;
  public checkboxBrand: CheckboxFilter;
  public rangePrice: RangeFilter;
  public rangeStock: RangeFilter;
  public whiteButton: WhiteButton;

  constructor(parentNode: HTMLElement, data: ProductsData[]) {
    super(parentNode, {
      tagName: 'aside',
      classList: ['left-filters'],
    });

    this.checkboxCategory = new CheckboxFilter(this.node, {
      title: 'Category',
      data: CheckboxFilterService.pickCategory(data),
    });

    this.checkboxBrand = new CheckboxFilter(this.node, {
      title: 'Brand',
      data: CheckboxFilterService.pickBrand(data),
    });

    this.rangePrice = new RangeFilter(this.node, {
      title: 'Price',
      data: RangeFilterService.pickPrice(data),
    });

    this.rangeStock = new RangeFilter(this.node, {
      title: 'Stock',
      data: RangeFilterService.pickStock(data),
    });

    this.whiteButton = new WhiteButton(this.node, {
      tagName: 'button',
      id: 'copy-query',
      content: 'Copy',
    });

    this.whiteButton = new BlueButton(this.node, {
      tagName: 'button',
      id: 'reset-filters',
      content: 'Reset',
    });
    this.listen();
  }

  public listen() {
    this.checkboxCategory.list.node.addEventListener('click', (e: Event) => {
      CheckboxFilterService.checkCheckboxValue(e);
      const newState = UpdateData.update();
      const brandData = CheckboxFilterService.pickBrand(newState);
      this.checkboxBrand.render(brandData);

      if (!CheckboxFilterService.checkedCategories.length) {
        const categoryData = CheckboxFilterService.pickCategory(State.allData);
        this.checkboxCategory.render(categoryData);
      }
    });

    this.checkboxBrand.list.node.addEventListener('click', (e: Event) => {
      CheckboxFilterService.checkCheckboxValue(e);
      const newState = UpdateData.update();
      const categoryData = CheckboxFilterService.pickCategory(newState);
      this.checkboxCategory.render(categoryData);

      if (!CheckboxFilterService.checkedBrands.length) {
        const brandData = CheckboxFilterService.pickBrand(State.allData);
        this.checkboxBrand.render(brandData);
      }
    });
  }
}
