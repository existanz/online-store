import './description.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../../../shared/models/response-data';
import { WhiteButton } from '../../../../shared/components/buttons/white-button';
import { BlueButton } from '../../../../shared/components/buttons/blue-button';
import CartService from '../../../services/cart-page/cart.service';
import stateService from '../../../../shared/services/state.service';
import viewService from '../../../services/store-page/change-view.service';
import modalService from '../../../../core/services/modal.service';

export class Description extends DOMElement {
  private title: DOMElement;
  private data: DOMElement;
  private props: DOMElement;
  private buttons: DOMElement;
  private bagButton: WhiteButton;
  private buyButton: BlueButton;

  constructor(parentNode: HTMLElement, product: ProductsData) {
    super(parentNode, {
      tagName: 'div',
      classList: ['description'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h1',
      classList: ['description__title'],
      content: product.title,
    });

    this.data = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['description__data'],
    });

    this.props = new DOMElement(this.data.node, {
      tagName: 'li',
      classList: ['description__prop'],
      content: `price: $${product.price}`,
    });

    this.props = new DOMElement(this.data.node, {
      tagName: 'li',
      classList: ['description__prop'],
      content: `in stock: ${product.stock}`,
    });

    this.props = new DOMElement(this.data.node, {
      tagName: 'li',
      classList: ['description__prop'],
      content: `brand: ${product.brand}`,
    });

    this.props = new DOMElement(this.data.node, {
      tagName: 'li',
      classList: ['description__prop'],
      content: product.description,
    });

    this.buttons = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['description__buttons'],
    });

    this.bagButton = new WhiteButton(this.buttons.node, {
      tagName: 'button',
      content: 'Add to bag',
    });
    if (CartService.idInCart(product) >= 0) this.bagButton.node.textContent = 'Remove from bag';

    this.bagButton.node.addEventListener('click', () => {
      if (CartService.idInCart(product) >= 0) CartService.removePositionFromCart(product);
      else CartService.addToCart(product);
      this.updateBagButton(product);
      viewService.view.render(stateService.current);
    });

    this.buyButton = new BlueButton(this.buttons.node, {
      tagName: 'button',
      content: 'Buy now',
    });

    this.buyButton.node.addEventListener('click', () => {
      if (modalService.checkUnique(product)) {
        CartService.addToCart(product);
        this.updateBagButton(product);
        viewService.view.render(stateService.current);
      }
      modalService.appendModal();
    });
  }

  private updateBagButton(product: ProductsData) {
    if (CartService.idInCart(product) >= 0) this.bagButton.node.textContent = 'Remove from bag';
    else this.bagButton.node.textContent = 'Add to bag';
  }
}
