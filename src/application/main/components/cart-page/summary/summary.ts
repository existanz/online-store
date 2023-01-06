import './summry.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { FormElement } from '../../../../shared/components/base-elements/form-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';
import { BlueButton } from '../../../../shared/components/buttons/blue-button';
import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import CartService from '../../../services/cart-page/cart.service';

export class Summary extends DOMElement {
  private title: DOMElement;
  private priceContainer: DOMElement;
  private totalPrice: DOMElement;
  private newPrice: DOMElement;
  private input: InputElement;
  private form: FormElement;
  private promt: DOMElement;
  private discountContainer: DOMElement;
  private discountText: DOMElement;
  private discountButton: ButtonElement;
  private submit: BlueButton;

  constructor(parantNode: HTMLElement) {
    super(parantNode, {
      tagName: 'div',
      classList: ['summary'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      classList: ['summary__title'],
      content: 'Summary',
    });

    this.priceContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['summary__price-container'],
    });

    this.totalPrice = new DOMElement(this.priceContainer.node, {
      tagName: 'p',
      classList: ['summary__total-price', 'summary__total-price--active'],
      content: `Total price: $${CartService.getTotalSum()}`,
    });

    this.newPrice = new DOMElement(this.priceContainer.node, {
      classList: ['summary__current-price'],
      tagName: 'p',
      content: `Current price: $${(CartService.getTotalSum() * 90) / 100}`,
    });

    this.form = new FormElement(this.node, {
      tagName: 'form',
      classList: ['summary__form'],
    });

    this.form.node.addEventListener('click', (e) => e.preventDefault());

    this.discountContainer = new DOMElement(this.form.node, {
      tagName: 'div',
      classList: ['summary__discount-continer'],
    });

    this.discountText = new DOMElement(this.discountContainer.node, {
      tagName: 'div',
      classList: ['summary__discount-text'],
      content: 'RS - 10%',
    });

    this.discountButton = new ButtonElement(this.discountText.node, {
      tagName: 'button',
      classList: ['summary__discount-button'],
    });

    this.discountText = new DOMElement(this.discountContainer.node, {
      tagName: 'div',
      classList: ['summary__discount-text'],
      content: 'RS - 10%',
    });

    this.discountButton = new ButtonElement(this.discountText.node, {
      tagName: 'button',
      classList: ['summary__discount-button', 'summary__discount-button--active'],
    });

    this.discountText = new DOMElement(this.discountContainer.node, {
      tagName: 'div',
      classList: ['summary__discount-text'],
      content: 'RS - 10%',
    });

    this.discountButton = new ButtonElement(this.discountText.node, {
      tagName: 'button',
      classList: ['summary__discount-button'],
    });

    this.input = new InputElement(this.form.node, {
      tagName: 'input',
      type: 'text',
      classList: ['summary__input'],
      placeholder: 'enter promo',
    });

    this.promt = new DOMElement(this.form.node, {
      tagName: 'div',
      classList: ['summary__promt'],
      content: 'enter RS or EPAM',
    });

    this.submit = new BlueButton(this.form.node, {
      tagName: 'button',
      type: 'submit',
      content: 'Buy now',
    });
  }

  render() {
    console.log('summary render');
  }
}
