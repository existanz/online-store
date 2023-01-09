import { DOMElement } from '../../shared/components/base-elements/dom-element';
import { ProductsData } from '../../shared/models/response-data';
import { ModalPage } from '../components/modal/modal';

export abstract class Validation {
  public static isEmptyCart(state: ProductsData[]) {
    return state.length === 0;
  }

  static checkAllValidity() {
    console.log('check all');
  }

  private static createValidationMessage(element: HTMLElement, message: string) {
    const error: DOMElement = new DOMElement(element, {
      tagName: 'p',
      classList: ['personal-info__error'],
      content: message,
    });
    element.append(error.node);
    // document.querySelector('.modal__close')?.addEventListener('click', () => this.removeErrorMessage(error));
    element.addEventListener('input', () => this.removeErrorMessage(error));
  }

  private static removeErrorMessage(error: DOMElement) {
    error.node.innerText = '';
    error.node.remove();
  }

  static addListeners(modal: ModalPage) {
    modal.personalInfo.nameInput.node.addEventListener('change', (e: Event) =>
      Validation.validateName(e, modal.personalInfo.nameContainer.node)
    );
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
    const message = '12332313';
    // const value = (e.target as HTMLInputElement).value;
    this.createValidationMessage(element, message);
  }

  private static validateNumber(e: Event, element: HTMLElement) {
    const message = (e.target as HTMLInputElement).value;
    // const value = (e.target as HTMLInputElement).value;
    this.createValidationMessage(element, message);
  }

  private static validateAdress(e: Event, element: HTMLElement) {
    const message = (e.target as HTMLInputElement).value;
    // const value = (e.target as HTMLInputElement).value;
    this.createValidationMessage(element, message);
  }

  private static validateEmail(e: Event, element: HTMLElement) {
    const message = (e.target as HTMLInputElement).value;
    // const value = (e.target as HTMLInputElement).value;
    this.createValidationMessage(element, message);
  }
}
