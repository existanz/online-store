import { ButtonElement } from '../../../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../../../shared/components/base-elements/image-element';
import { ProductsData } from '../../../../../shared/models/response-data';
import CartService from '../../../../services/cart-page/cart.service';

export class CartItem extends DOMElement {
  private count: DOMElement | null;
  private photo: ImageElement | null;
  private description: DOMElement | null;
  private title: DOMElement | null;
  private desc: DOMElement | null;
  private price: DOMElement | null;
  private stock: DOMElement | null;
  private controls: DOMElement | null;
  private minus: ButtonElement;
  private plus: ButtonElement;
  private itemCount: DOMElement | null;

  constructor(parentNode: HTMLElement, product: ProductsData, index: number) {
    super(parentNode, {
      tagName: 'li',
      classList: ['cart-list__item'],
    });

    this.node.addEventListener('click', (el) => {
      if (product) {
        if (el.target == this.plus.node) {
          CartService.addToCart(product);
        } else if (el.target == this.minus.node) {
          CartService.removeFromCart(product);
        } else {
          location.href = '/#product?idProd=' + product?.id;
        }
      }
    });

    this.count = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['cart-list__count'],
      content: `${index + 1}`,
    });

    this.photo = new ImageElement(this.node, {
      tagName: 'img',
      src: product.images[0],
      classList: ['cart-list__image'],
    });

    this.description = new DOMElement(this.node, {
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

    this.controls = new DOMElement(this.node, {
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
      content: CartService.countsCart[index].toString(),
    });

    this.plus = new ButtonElement(this.controls.node, {
      tagName: 'button',
      classList: ['cart-list__plus'],
    });
  }
}
