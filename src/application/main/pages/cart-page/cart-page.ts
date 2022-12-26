import './cart-page.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';
import { ProductsData, ResponseData } from '../../../shared/models/response-data';
import { CartItems } from '../../components/cart-page/items/items';
import { Summary } from '../../components/cart-page/summary/summary';

export class CartPage extends Page {
  private productData: ProductsData | null;
  public response: ResponseData | null;

  private itemsContainer: DOMElement;
  private summaryContainer: DOMElement;

  private items: CartItems | null;
  private summary: Summary | null;

  constructor(id: string, productData?: ProductsData) {
    super(id);

    // временно присваиваем productData null и загружаем через метод данные
    this.productData = productData ? productData : null;
    this.response = null;
    this.loadTmpData();

    this.itemsContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['cart-page__items'],
    });

    this.summaryContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['cart-page__summary'],
    });
    this.items = null;
    this.summary = null;
  }

  private async loadTmpData() {
    const url = 'https://dummyjson.com/products?limit=10';
    await fetch(url)
      .then((res) => res.json())
      .then((data: ResponseData) => (this.response = data));
    this.items = new CartItems(this.itemsContainer.node, this.response as ResponseData);
    this.summary = new Summary(this.summaryContainer.node);
  }
}
