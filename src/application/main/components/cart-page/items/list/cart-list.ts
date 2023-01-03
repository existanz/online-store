import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../../../shared/components/base-elements/image-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import { CartItem } from './cart-item';
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
    data.map((product, index) => new CartItem(this.node, product, index));
  }
}
