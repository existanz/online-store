import './description.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../shared/models/response-data';
import { WhiteButton } from '../../../../shared/components/buttons/white-button';
import { BlueButton } from '../../../../shared/components/buttons/blue-button';

export class Description extends DOMElement {
  private title: DOMElement;
  private data: DOMElement;
  private props: DOMElement;
  private buttons: DOMElement;
  private bagButton: WhiteButton;
  private buyButton: BlueButton;

  constructor(parentNode: HTMLElement, data: ProductsData) {
    super(parentNode, {
      tagName: 'div',
      classList: ['description'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h1',
      classList: ['description__title'],
      content: data.title,
    });

    this.data = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['description__data'],
    });

    this.props = new DOMElement(this.data.node, {
      tagName: 'li',
      classList: ['description__prop'],
      content: `price: $${data.price}`,
    });

    this.props = new DOMElement(this.data.node, {
      tagName: 'li',
      classList: ['description__prop'],
      content: `in stock: ${data.stock}`,
    });

    this.props = new DOMElement(this.data.node, {
      tagName: 'li',
      classList: ['description__prop'],
      content: `brand: ${data.brand}`,
    });

    this.props = new DOMElement(this.data.node, {
      tagName: 'li',
      classList: ['description__prop'],
      content: data.description,
    });

    this.buttons = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['description__buttons'],
    });

    this.bagButton = new WhiteButton(this.buttons.node, {
      tagName: 'button',
      content: 'Add to bag',
    });

    this.buyButton = new BlueButton(this.buttons.node, {
      tagName: 'button',
      content: 'Buy now',
    });
  }
}
