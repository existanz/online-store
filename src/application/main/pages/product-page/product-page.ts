import './product-page.scss';
import { Page } from '../../../shared/components/page';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../shared/models/response-data';
import { Breadcrumbs } from '../../components/product-page/breadcrumbs/breadcrumbs';
import { Gallary } from '../../components/product-page/gallary/gallary';
import { Description } from '../../components/product-page/description/description';

export class ProductPage extends Page {
  private productData: ProductsData | undefined;

  private breadcrumbsContainer: DOMElement;
  private gallaryContainer: DOMElement;
  private descriptionContainer: DOMElement;

  private breadcrumbs: Breadcrumbs | null;
  private gallary: Gallary | null;
  private description: Description | null;

  // в конструктор будет передаваться productData, пока данные получаем через запрос
  constructor(id: string, productData: ProductsData) {
    super(id);
    this.productData = productData;

    this.breadcrumbsContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['product-page__breadcrumbs'],
    });

    this.gallaryContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['product-page__gallary'],
    });

    this.descriptionContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['product-page__description'],
    });
    console.log(this.productData);
    this.breadcrumbs = new Breadcrumbs(this.breadcrumbsContainer.node, productData);
    this.gallary = new Gallary(this.gallaryContainer.node, productData);
    this.description = new Description(this.descriptionContainer.node, productData);
  }
}
