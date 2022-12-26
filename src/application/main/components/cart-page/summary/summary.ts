import './summry.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { FormElement } from '../../../../shared/components/base-elements/form-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';
import { BlueButton } from '../../../../shared/components/buttons/blue-button';

export class Summary extends DOMElement {
  private title: DOMElement;
  private totalPrice: DOMElement;
  private newPrice: DOMElement;
  private input: InputElement;
  private form: FormElement;
  private promt: DOMElement;
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

    this.totalPrice = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['summary__total-price'],
      content: 'Total price: $99999',
    });

    this.newPrice = new DOMElement(this.node, {
      classList: ['summary__current-price'],
      tagName: 'p',
      content: 'Current price: $88888',
    });

    this.form = new FormElement(this.node, {
      tagName: 'form',
      classList: ['summary__form'],
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
      content: 'input RS or EPAM',
    });

    this.submit = new BlueButton(this.form.node, {
      tagName: 'button',
      type: 'submit',
      content: 'Buy now',
    });
  }
}
