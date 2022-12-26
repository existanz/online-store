import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../../shared/components/base-elements/input-element';
import { ResponseData } from '../../../../../shared/models/response-data';
import './pagination.scss';

export class Pagination extends DOMElement {
  private title: DOMElement;
  private paginationContainer: DOMElement;
  private paginationText: DOMElement;
  private productOnPage: InputElement;
  private leftButton: ButtonElement;
  private currentPage: InputElement;
  private rightButton: ButtonElement;
  private totalPages: DOMElement;

  constructor(parentNode: HTMLElement, data: ResponseData) {
    super(parentNode, {
      tagName: 'div',
      classList: ['pagination'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h1',
      classList: ['pagination__title'],
      content: 'Products in bag',
    });

    this.paginationContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['pagination__container'],
    });

    this.paginationText = new DOMElement(this.paginationContainer.node, {
      tagName: 'span',
      classList: ['pagination__text'],
      content: 'Products on page:',
    });

    this.productOnPage = new InputElement(this.paginationContainer.node, {
      tagName: 'input',
      type: 'number',
      classList: ['pagination__input'],
      value: '3',
    });

    this.leftButton = new ButtonElement(this.paginationContainer.node, {
      tagName: 'button',
      classList: ['pagination__left'],
    });

    this.currentPage = new InputElement(this.paginationContainer.node, {
      tagName: 'input',
      classList: ['pagination__current-page'],
      type: 'number',
      value: '1',
    });

    this.rightButton = new ButtonElement(this.paginationContainer.node, {
      tagName: 'button',
      classList: ['pagination__right'],
    });

    this.totalPages = new DOMElement(this.paginationContainer.node, {
      tagName: 'p',
      classList: ['pagination__total-page'],
      content: `of ${Math.ceil(
        data.products.length / parseInt(this.productOnPage.node.getAttribute('value') as string)
      )}`,
    });
  }
}
