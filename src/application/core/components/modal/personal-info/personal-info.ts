import './personal-info.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';

export class PersonalInfo extends DOMElement {
  private title: DOMElement;

  public nameContainer: DOMElement;
  public nameInput: InputElement;

  public phoneContainer: DOMElement;
  public phoneInput: InputElement;

  public addressContainer: DOMElement;
  public addressInput: InputElement;

  public emailContainer: DOMElement;
  public emailInput: InputElement;

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
  }
}
