import './list-card.scss';
import { DOMElement } from '../../../../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../../../../shared/components/base-elements/image-element';
import { ProductsData } from '../../../../../../shared/models/response-data';
import { ButtonElement } from '../../../../../../shared/components/base-elements/button-element';
import CartService from '../../../../../services/cart-page/cart.service';

export class ListCard extends DOMElement {
  private photo: ImageElement;
  private description: DOMElement;
  private title: DOMElement;
  private text: DOMElement;
  private price: DOMElement;
  private stock: DOMElement;
  private controls: DOMElement;
  private button: ButtonElement;
  private hasInCart: boolean;

  constructor(parentNode: HTMLElement, product: ProductsData) {
    super(parentNode, {
      tagName: 'div',
      classList: ['list-card'],
    });

    this.hasInCart = CartService.idInCart(product) >= 0;

    this.node.addEventListener('click', (el) => {
      if (el.target == this.button.node) {
        if (this.hasInCart) CartService.removeFromCart(product);
        else CartService.addToCart(product);
        this.updateButton(product);
      } else {
        location.hash = '#product?idProd=' + product?.id;
      }
    });

    this.photo = new ImageElement(this.node, {
      tagName: 'img',
      src: product.images[0],
      classList: ['list-card__image'],
    });

    this.description = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['list-cart__description'],
    });

    this.title = new DOMElement(this.description.node, {
      tagName: 'h2',
      classList: ['list-card__title'],
      content: product.title,
    });

    this.text = new DOMElement(this.description.node, {
      tagName: 'p',
      classList: ['list-cart__text'],
      content: product.description,
    });

    this.price = new DOMElement(this.description.node, {
      tagName: 'p',
      classList: ['list-cart__price'],
      content: `Price: $${product.price}`,
    });

    this.stock = new DOMElement(this.description.node, {
      tagName: 'p',
      classList: ['list-cart__stock'],
      content: `In stock: ${product.stock}`,
    });

    this.controls = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['list-cart__controls'],
    });

    this.button = new ButtonElement(this.controls.node, {
      tagName: 'button',
      classList: ['list-cart__btn'],
      content: 'Add to bug',
    });

    if (this.hasInCart) this.button.node.innerText = 'Remove from bug';
  }

  private updateButton(product: ProductsData) {
    this.hasInCart = CartService.idInCart(product) >= 0;
    if (this.hasInCart) this.button.node.innerText = 'Remove from bug';
    else this.button.node.innerText = 'Add to bug';
  }
}
