import './left-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { CheckboxFilter } from './checkbox-filters/checkbox-filter';
import { RangeFilter } from './range-filters/range-filter';
import { WhiteButton } from '../../../../shared/components/buttons/white-button';
import { BlueButton } from '../../../../shared/components/buttons/blue-button';

export class LeftFilters extends DOMElement {
  public checkboxCategory: CheckboxFilter;
  public checkboxBrand: CheckboxFilter;
  public rangePrice: RangeFilter;
  public rangeStock: RangeFilter;
  public whiteButton: WhiteButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'aside',
      classList: ['left-filters'],
    });

    this.checkboxCategory = new CheckboxFilter(this.node, {
      title: 'Category',
      data: 'какие-то данные для рендера',
    });

    this.checkboxBrand = new CheckboxFilter(this.node, {
      title: 'Brand',
      data: 'какие-то данные для рендера',
    });

    this.rangePrice = new RangeFilter(this.node, {
      title: 'Price',
      data: '123',
    });

    this.rangeStock = new RangeFilter(this.node, {
      title: 'Stock',
      data: '123',
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
  }
}
