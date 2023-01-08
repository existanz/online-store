import './personal-info.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';

export class PersonalInfo extends DOMElement {
  private title: DOMElement;

  private nameContainer: DOMElement;
  private nameInput: InputElement;
  private nameError: DOMElement;

  private phoneContainer: DOMElement;
  private phoneInput: InputElement;
  private phoneError: DOMElement;

  private addressContainer: DOMElement;
  private addressInput: InputElement;
  private addressError: DOMElement;

  private emailContainer: DOMElement;
  private emailInput: InputElement;
  private emailError: DOMElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['personal-info'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'h2',
      classList: ['personal-info__title'],
      content: 'Personal details',
    });

    this.nameContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['personal-info__container'],
    });

    this.nameInput = new InputElement(this.nameContainer.node, {
      tagName: 'input',
      type: 'text',
      classList: ['personal-info__input'],
      placeholder: 'Name',
    });

    this.nameError = new DOMElement(this.nameContainer.node, {
      tagName: 'p',
      classList: ['personal-info__error'],
      content: 'Error! Valid name: Name Surname',
    });

    this.phoneContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['personal-info__container'],
    });

    this.phoneInput = new InputElement(this.phoneContainer.node, {
      tagName: 'input',
      type: 'number',
      classList: ['personal-info__input'],
      placeholder: 'Phone',
    });

    this.phoneError = new DOMElement(this.phoneContainer.node, {
      tagName: 'p',
      classList: ['personal-info__error'],
      content: 'Error! Valid phone: +88888888888',
    });

    this.addressContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['personal-info__container'],
    });

    this.addressInput = new InputElement(this.addressContainer.node, {
      tagName: 'input',
      type: 'text',
      classList: ['personal-info__input'],
      placeholder: 'Address',
    });

    this.addressError = new DOMElement(this.addressContainer.node, {
      tagName: 'p',
      classList: ['personal-info__error'],
      content: 'Error! Valid address: Word Word Word',
    });

    this.emailContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['personal-info__container'],
    });

    this.emailInput = new InputElement(this.emailContainer.node, {
      tagName: 'input',
      type: 'email',
      classList: ['personal-info__input'],
      placeholder: 'Email',
    });

    this.emailError = new DOMElement(this.emailContainer.node, {
      tagName: 'p',
      classList: ['personal-info__error'],
      content: 'Error! Valid email: email@email.com',
    });
  }
}
