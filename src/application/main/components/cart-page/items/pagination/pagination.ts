import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../../shared/components/base-elements/input-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { State } from '../../../../../shared/services/state.service';
import CartService from '../../../../services/cart-page/cart.service';
import PaginationService from '../../../../services/cart-page/pagination.service';
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

  constructor(parentNode: HTMLElement, data: ProductsData[]) {
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
      value: PaginationService.productsPerPage.toString(),
    });

    this.productOnPage.node.addEventListener('input', (e) => {
      PaginationService.productsPerPage = parseInt((e.target as HTMLInputElement).value);
      CartService.container.render();
      this.setHash();
    });

    this.leftButton = new ButtonElement(this.paginationContainer.node, {
      tagName: 'button',
      classList: ['pagination__left'],
    });

    this.leftButton.node.addEventListener('click', () => {
      PaginationService.curPage--;
      this.render();
    });

    this.currentPage = new InputElement(this.paginationContainer.node, {
      tagName: 'input',
      classList: ['pagination__current-page'],
      type: 'number',
      readonly: true,
      value: PaginationService.curPage.toString(),
    });

    this.rightButton = new ButtonElement(this.paginationContainer.node, {
      tagName: 'button',
      classList: ['pagination__right'],
    });

    this.rightButton.node.addEventListener('click', () => {
      PaginationService.curPage++;
      this.render();
    });

    this.totalPages = new DOMElement(this.paginationContainer.node, {
      tagName: 'p',
      classList: ['pagination__total-page'],
      content: `of ${PaginationService.getMaxPage(data)}`,
    });
  }
  private setHash() {
    window.location.hash = `#cart?prodPerPage=${PaginationService.productsPerPage}&curPage=${PaginationService.curPage}`;
  }
  public render() {
    this.setHash();
    this.totalPages.node.textContent = `of ${PaginationService.getMaxPage(State.cart)}`;
    this.productOnPage.value = PaginationService.productsPerPage;
    this.currentPage.value = PaginationService.curPage;
  }
}
