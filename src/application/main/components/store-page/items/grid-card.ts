import './grid-card.scss';
import { ProductsData } from '../../../../shared/models/response-data';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../../shared/components/base-elements/image-element';
import { ButtonElement } from '../../../../shared/components/base-elements/button-element';

export class GridCard {
  private card: DOMElement;
  private imageContainer: DOMElement;
  private image: ImageElement;
  private description: DOMElement;
  private text: DOMElement;
  private buttons: DOMElement;
  private button: ButtonElement;
  private title: DOMElement;
  private price: DOMElement;

  constructor(parentNode: HTMLElement, product: ProductsData | null) {
    this.card = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['grid-card'],
    });

    this.imageContainer = new DOMElement(this.card.node, {
      tagName: 'div',
      classList: ['grid-card__image-container'],
    });

    this.image = new ImageElement(this.imageContainer.node, {
      tagName: 'img',
      classList: ['grid-card__image'],
      src: product?.images[0] as string,
      alt: `${product?.title}`,
    });

    this.description = new DOMElement(this.card.node, {
      tagName: 'div',
      classList: ['grid-card__description'],
    });

    this.text = new DOMElement(this.description.node, {
      tagName: 'div',
      classList: ['grid-card__text'],
    });

    this.buttons = new DOMElement(this.description.node, {
      tagName: 'div',
      classList: ['grid-card__buttons'],
    });

    this.button = new ButtonElement(this.buttons.node, {
      tagName: 'button',
      classList: ['grid-card__button'],
    });

    this.title = new DOMElement(this.text.node, {
      tagName: 'h3',
      classList: ['grid-card__title'],
      content: product?.title,
    });

    this.price = new DOMElement(this.text.node, {
      tagName: 'p',
      classList: ['grid-card__price'],
      content: `$${product?.price}`,
    });
  }
}
