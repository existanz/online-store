import './personal-info.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../shared/components/base-elements/input-element';
import validation from '../../../services/validation.service';

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

    this.nameInput.node.addEventListener('change', (e: Event) => {
      validation.validateName(e, this.nameContainer.node);
    });

    this.phoneContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['personal-info__container'],
    });

    this.phoneInput = new InputElement(this.phoneContainer.node, {
      tagName: 'input',
      type: 'text',
      classList: ['personal-info__input'],
      placeholder: 'Phone',
    });

    this.phoneInput.node.addEventListener('change', (e: Event) =>
      validation.validateNumber(e, this.phoneContainer.node)
    );
    this.phoneInput.node.addEventListener('input', (e: Event) => validation.formatNumber(e));

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

    this.addressInput.node.addEventListener('change', (e: Event) =>
      validation.validateAdress(e, this.addressContainer.node)
    );

    this.emailContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['personal-info__container'],
    });

    this.emailInput = new InputElement(this.emailContainer.node, {
      tagName: 'input',
      type: 'text',
      classList: ['personal-info__input'],
      placeholder: 'Email',
    });

    this.emailInput.node.addEventListener('change', (e: Event) =>
      validation.validateEmail(e, this.emailContainer.node)
    );
  }
}
