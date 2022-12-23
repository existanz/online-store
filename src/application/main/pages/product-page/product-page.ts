import './product-page.scss';
import { Page } from '../../../shared/components/page';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { ProductsData, ResponseData } from '../../../shared/models/response-data';
import { Breadcrumbs } from '../../components/product-page/breadcrumbs/breadcrumbs';
import { Gallary } from '../../components/product-page/gallary/gallary';

export class ProductPage extends Page {
  private productData: ProductsData | null;

  private breadcrumbsContainer: DOMElement;
  private gallaryContainer: DOMElement;
  private description: DOMElement;

  private breadcrumbs: Breadcrumbs | null;
  private gallary: Gallary | null;

  // в конструктор будет передаваться productData, пока данные получаем через запрос
  constructor(id: string, productData?: ProductsData) {
    super(id);

    this.breadcrumbsContainer = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['product-page__breadcrumbs'],
    });

    this.gallaryContainer = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['product-page__gallary'],
    });

    this.description = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['product-page__description'],
    });

    // временно присваиваем productData null и загружаем через метод данные
    this.productData = productData ? productData : null;
    this.loadTmpData();
    this.breadcrumbs = null;
    this.gallary = null;
  }

  private async loadTmpData() {
    const url = 'https://dummyjson.com/products?limit=100';
    await fetch(url)
      .then((res) => res.json())
      .then((data: ResponseData) => (this.productData = data.products[0]));
    console.log(this.productData);
    this.breadcrumbs = new Breadcrumbs(this.breadcrumbsContainer.node, this.productData as ProductsData);
    this.gallary = new Gallary(this.gallaryContainer.node, this.productData as ProductsData);
  }
}
