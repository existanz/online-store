import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../../shared/components/base-elements/input-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { State } from '../../../../../shared/services/state.service';
import cartService from '../../../../services/cart-page/cart.service';
import paginationService from '../../../../services/cart-page/pagination.service';
import { CartList } from '../list/cart-list';
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
      value: paginationService.productsPerPage.toString(),
    });

    this.productOnPage.node.addEventListener('input', (e) => {
      paginationService.productsPerPage = parseInt((e.target as HTMLInputElement).value);
      (cartService.container as CartList).render();
      this.setHash();
    });

    this.leftButton = new ButtonElement(this.paginationContainer.node, {
      tagName: 'button',
      classList: ['pagination__left'],
    });

    this.leftButton.node.addEventListener('click', () => {
      paginationService.curPage--;
      this.setHash();
      this.render();
    });

    this.currentPage = new InputElement(this.paginationContainer.node, {
      tagName: 'input',
      classList: ['pagination__current-page'],
      type: 'number',
      readonly: true,
      value: paginationService.curPage.toString(),
    });

    this.rightButton = new ButtonElement(this.paginationContainer.node, {
      tagName: 'button',
      classList: ['pagination__right'],
    });

    this.rightButton.node.addEventListener('click', () => {
      paginationService.curPage++;
      this.setHash();
      this.render();
    });

    this.totalPages = new DOMElement(this.paginationContainer.node, {
      tagName: 'p',
      classList: ['pagination__total-page'],
      content: `of ${paginationService.getMaxPage(data)}`,
    });
  }
  private setHash() {
    window.location.hash = `#cart?prodPerPage=${paginationService.productsPerPage}&curPage=${paginationService.curPage}`;
  }
  public render() {
    this.totalPages.node.textContent = `of ${paginationService.getMaxPage(State.cart)}`;
    this.productOnPage.value = paginationService.productsPerPage;
    this.currentPage.value = paginationService.curPage;
  }
}
