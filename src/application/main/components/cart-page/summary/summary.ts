import './summry.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { FormElement } from '../../../../shared/components/base-elements/form-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';
import { BlueButton } from '../../../../shared/components/buttons/blue-button';
import { ButtonElement } from '../../../../shared/components/base-elements/button-element';
import CartService from '../../../services/cart-page/cart.service';
import { ModalService } from '../../../../core/services/modal.service';

export class Summary extends DOMElement {
  private title: DOMElement;
  private priceContainer: DOMElement;
  private totalCount: DOMElement;
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

    this.totalCount = new DOMElement(this.priceContainer.node, {
      tagName: 'p',
      classList: ['summary__total-count'],
      content: `Products: ${CartService.getTotalCount()}`,
    });

    this.totalPrice = new DOMElement(this.priceContainer.node, {
      tagName: 'p',
      classList: ['summary__total-price', 'summary__total-price--active'],
      content: `Total price: $${CartService.getTotalSum()}`,
    });

    this.newPrice = new DOMElement(this.priceContainer.node, {
      classList: ['summary__current-price'],
      tagName: 'p',
      content: `Current price: $${CartService.getCurSum()}`,
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

    this.input = new InputElement(this.form.node, {
      tagName: 'input',
      type: 'text',
      classList: ['summary__input'],
      placeholder: 'enter promo',
    });

    this.input.node.addEventListener('input', (e) => {
      const newValue = (e.target as HTMLInputElement).value.toLocaleUpperCase();
      this.renderPromos(newValue);
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

    this.submit.node.addEventListener('click', () => ModalService.appendModal());
    this.renderPromos();
  }

  private renderPromos(promo?: string) {
    this.discountContainer.node.innerHTML = '';
    CartService.activePromo.forEach((elem) => {
      this.discountText = new DOMElement(this.discountContainer.node, {
        tagName: 'div',
        classList: ['summary__discount-text'],
        content: `${elem} - 10%`,
      });

      this.discountButton = new ButtonElement(this.discountText.node, {
        tagName: 'button',
        classList: ['summary__discount-button', 'summary__discount-button--active'],
      });
      this.discountButton.node.addEventListener('click', () => CartService.deactivatePromo(elem));
    });
    if (promo && CartService.isPromo(promo)) {
      if (!CartService.isActivePromo(promo)) {
        this.discountText = new DOMElement(this.discountContainer.node, {
          tagName: 'div',
          classList: ['summary__discount-text'],
          content: `${promo} - 10%`,
        });

        this.discountButton = new ButtonElement(this.discountText.node, {
          tagName: 'button',
          classList: ['summary__discount-button'],
        });
        this.discountButton.node.addEventListener('click', () => CartService.activatePromo(promo));
      }
    }
  }

  public render() {
    this.totalPrice.node.textContent = `Total price: $${CartService.getTotalSum()}`;
    this.newPrice.node.textContent = `Current price: $${CartService.getCurSum()}`;
    this.renderPromos();
  }
}
