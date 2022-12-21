import './left-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { CheckboxFilter } from './checkbox-filters/checkbox-filter';
import { RangeFilter } from './range-filters/range-filter';

export class LeftFilters {
  private leftFilters: DOMElement;

  public checkboxCategory: CheckboxFilter;
  public checkboxBrand: CheckboxFilter;
  public rangePrice: RangeFilter;
  public rangeStock: RangeFilter;

  constructor(parentNode: HTMLElement) {
    this.leftFilters = new DOMElement(parentNode, {
      tagName: 'aside',
      classList: ['left-filters'],
    });

    this.checkboxCategory = new CheckboxFilter(this.leftFilters.node, {
      title: 'Category',
      data: 'какие-то данные для рендера',
    });

    this.checkboxBrand = new CheckboxFilter(this.leftFilters.node, {
      title: 'Brand',
      data: 'какие-то данные для рендера',
    });

    this.rangePrice = new RangeFilter(this.leftFilters.node, {
      title: 'Price',
      data: '123',
    });

    this.rangeStock = new RangeFilter(this.leftFilters.node, {
      title: 'Stock',
      data: '123',
    });
  }
}
