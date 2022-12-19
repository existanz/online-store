import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../../shared/components/base-elements/input-element';
import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { SVG } from '../../../../../shared/components/svg-icons';

export class Search {
  private search: DOMElement;
  private searchButton: ButtonElement;
  private searchInput: InputElement;

  constructor(parentNode: HTMLElement) {
    this.search = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['search'],
    });

    this.searchButton = new ButtonElement(this.search.node, {
      tagName: 'button',
      classList: ['search__btn'],
    });
    this.searchButton.node.innerHTML = SVG.search;

    this.searchInput = new InputElement(this.search.node, {
      tagName: 'input',
      type: 'text',
      classList: ['search__input'],
      placeholder: 'Search for products',
    });
  }
}
