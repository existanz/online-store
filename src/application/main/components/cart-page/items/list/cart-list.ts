import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../../../shared/components/base-elements/image-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import './cart-list.scss';

export class CartList extends DOMElement {
  private item: DOMElement | null;
  private count: DOMElement | null;
  private photo: ImageElement | null;
  private description: DOMElement | null;
  private title: DOMElement | null;
  private desc: DOMElement | null;
  private price: DOMElement | null;
  private stock: DOMElement | null;
  private controls: DOMElement | null;
  private minus: ButtonElement | null;
  private plus: ButtonElement | null;
  private itemCount: DOMElement | null;

  constructor(parentNode: HTMLElement, data?: ProductsData[]) {
    super(parentNode, {
      tagName: 'ul',
      classList: ['cart-list'],
    });

    this.item = null;
    this.count = null;
    this.photo = null;
    this.description = null;
    this.title = null;
    this.desc = null;
    this.price = null;
    this.stock = null;
    this.controls = null;
    this.minus = null;
    this.itemCount = null;
    this.plus = null;

    if (data) {
      this.render(data);
    }
  }

  public render(data: ProductsData[]) {
    data.map((product, index) => {
      this.node.addEventListener('click', () => (location.href = '/#product?idProd=' + product?.id));

      this.item = new DOMElement(this.node, {
        tagName: 'li',
        classList: ['cart-list__item'],
      });

      this.count = new DOMElement(this.item.node, {
        tagName: 'div',
        classList: ['cart-list__count'],
        content: `${index + 1}`,
      });

      this.photo = new ImageElement(this.item.node, {
        tagName: 'img',
        src: product.images[0],
        classList: ['cart-list__image'],
      });

      this.description = new DOMElement(this.item.node, {
        tagName: 'div',
        classList: ['cart-list__description'],
      });

      this.title = new DOMElement(this.description.node, {
        tagName: 'h2',
        classList: ['cart-list__item-title'],
        content: product.title,
      });

      this.desc = new DOMElement(this.description.node, {
        tagName: 'p',
        classList: ['cart-list__item-desc'],
        content: product.description,
      });

      this.price = new DOMElement(this.description.node, {
        tagName: 'p',
        classList: ['cart-list__price'],
        content: `Price: $${product.price}`,
      });

      this.stock = new DOMElement(this.description.node, {
        tagName: 'p',
        classList: ['cart-list__stock'],
        content: `In stock: ${product.stock}`,
      });

      this.controls = new DOMElement(this.item.node, {
        tagName: 'div',
        classList: ['cart-list__controls'],
      });

      this.minus = new ButtonElement(this.controls.node, {
        tagName: 'button',
        classList: ['cart-list__minus'],
      });

      this.itemCount = new DOMElement(this.controls.node, {
        tagName: 'div',
        classList: ['cart-list__item-count'],
        content: '1',
      });

      this.plus = new ButtonElement(this.controls.node, {
        tagName: 'button',
        classList: ['cart-list__plus'],
      });
    });
  }
}
