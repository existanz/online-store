import { DOMElement } from '../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../shared/models/response-data';
import { ModalPage } from '../components/modal/modal';

export abstract class Validation {
  public static isEmptyCart(state: ProductsData[]) {
    return state.length === 0;
  }

  static checkAllValidity() {
    console.log('check');
    // Validation.validateName(e, modal.personalInfo.nameContainer.node);
  }

  private static createValidationMessage(element: HTMLElement, message: string) {
    const error = new DOMElement(element, {
      tagName: 'p',
      classList: ['personal-info__error'],
      content: message,
    });
    element.append(error.node);
    // при закрытии модалки не стирает старное значение в сообщении
    // повявляется 2+ сообщения
    document.querySelector('.modal__close')?.addEventListener('click', () => this.removeErrorMessage(error));
    element.addEventListener('input', () => this.removeErrorMessage(error));
  }

  private static removeErrorMessage(error: DOMElement) {
    error.node.innerText = '';
    error.node.remove();
  }

  static addListeners(modal: ModalPage) {
    modal.personalInfo.nameInput.node.addEventListener('change', (e: Event) => {
      Validation.validateName(e, modal.personalInfo.nameContainer.node);
    });
    modal.personalInfo.phoneInput.node.addEventListener('change', (e: Event) =>
      Validation.validateNumber(e, modal.personalInfo.phoneContainer.node)
    );
    modal.personalInfo.addressInput.node.addEventListener('change', (e: Event) =>
      Validation.validateAdress(e, modal.personalInfo.addressContainer.node)
    );
    modal.personalInfo.emailInput.node.addEventListener('change', (e: Event) =>
      Validation.validateEmail(e, modal.personalInfo.emailContainer.node)
    );
  }

  private static validateName(e: Event, element: HTMLElement) {
    const value = (e.target as HTMLInputElement).value;

    const count: boolean = value.split(' ').length > 1;
    const words: boolean = /^[a-zA-Z]+$/.test(value.split(' ').join('').trim().toLowerCase());
    const length: boolean = value.split(' ').filter((item) => item.trim().length < 3).length === 0;

    const message = count && words && length ? '✓ Valid' : '✖ Invalid';
    this.createValidationMessage(element, message);
  }

  private static validateNumber(e: Event, element: HTMLElement) {
    const value = (e.target as HTMLInputElement).value;

    const firstNumber: boolean = value.split('')[0] === '+';
    const numbers: boolean = /^\d+$/.test(value.slice(1));
    const length: boolean = value.slice(1).length > 8;

    const message = firstNumber && numbers && length ? '✓ Valid' : '✖ Invalid';
    this.createValidationMessage(element, message);
  }

  private static validateAdress(e: Event, element: HTMLElement) {
    const value = (e.target as HTMLInputElement).value;

    const count: boolean = value.split(' ').length > 2;
    const length: boolean = value.split(' ').filter((item) => item.trim().length < 5).length === 0;

    const message = count && length ? '✓ Valid' : '✖ Invalid';
    this.createValidationMessage(element, message);
  }

  private static validateEmail(e: Event, element: HTMLElement) {
    const value = (e.target as HTMLInputElement).value;

    const arr1: string[] = value.split('@');
    const arr2: string[] = arr1.length > 1 ? arr1[1].split('.') : arr1;

    const message = [...arr1, ...arr2].length === 4 ? '✓ Valid' : '✖ Invalid';
    this.createValidationMessage(element, message);
  }
}
