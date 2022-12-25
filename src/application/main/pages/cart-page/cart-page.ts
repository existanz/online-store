import './cart-page.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';
import { ProductsData, ResponseData } from '../../../shared/models/response-data';

export class CartPage extends Page {
  private productData: ProductsData | null;
  public response: ResponseData | null;

  private items: DOMElement;
  private summary: DOMElement;

  constructor(id: string, productData?: ProductsData) {
    super(id);

    // временно присваиваем productData null и загружаем через метод данные
    this.productData = productData ? productData : null;
    this.response = null;
    this.loadTmpData();

    this.items = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['cart-page__items'],
    });

    this.summary = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['cart-page__summary'],
    });
  }

  private async loadTmpData() {
    const url = 'https://dummyjson.com/products?limit=10';
    await fetch(url)
      .then((res) => res.json())
      .then((data: ResponseData) => (this.response = data));
  }
}
