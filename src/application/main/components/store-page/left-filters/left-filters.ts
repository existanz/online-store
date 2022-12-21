import './left-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { CheckboxFilter } from './checkbox-filters/checkbox-filter';

export class LeftFilters {
  private leftFilters: DOMElement;

  private checkbox: CheckboxFilter;

  constructor(parentNode: HTMLElement) {
    this.leftFilters = new DOMElement(parentNode, {
      tagName: 'aside',
      classList: ['left-filters'],
    });

    this.checkbox = new CheckboxFilter(this.leftFilters.node, {
      title: 'Category',
      data: 'какие-то данные для рендера',
    });

    this.checkbox = new CheckboxFilter(this.leftFilters.node, {
      title: 'Brand',
      data: 'какие-то данные для рендера',
    });
  }
}
