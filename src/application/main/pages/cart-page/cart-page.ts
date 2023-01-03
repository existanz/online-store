import './cart-page.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';
import { ProductsData } from '../../../shared/models/response-data';
import { CartItems } from '../../components/cart-page/items/items';
import { Summary } from '../../components/cart-page/summary/summary';
import { State } from '../../../shared/services/state.service';

export class CartPage extends Page {
  private productData: ProductsData[] | null;
  public response: ProductsData[] | null;

  private itemsContainer: DOMElement;
  private summaryContainer: DOMElement;

  private items: CartItems | null;
  private summary: Summary | null;

  constructor(id: string, productData?: ProductsData[]) {
    super(id);

    // временно присваиваем productData null и загружаем через метод данные
    this.productData = productData ? productData : null;
    this.response = null;

    this.itemsContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['cart-page__items'],
    });

    this.summaryContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['cart-page__summary'],
    });
    this.items = new CartItems(this.itemsContainer.node, State.cart);
    this.summary = new Summary(this.summaryContainer.node);
  }
}
