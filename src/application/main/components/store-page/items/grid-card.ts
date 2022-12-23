import './grid-card.scss';
import { ProductsData } from '../../../../shared/models/response-data';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../../shared/components/base-elements/image-element';

export class GridCard {
  private card: DOMElement;
  private imageContainer: DOMElement;
  private image: ImageElement;
  private description: DOMElement;

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
  }
}
