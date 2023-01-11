import { ProductsData } from '../../shared/models/response-data';
import { State } from '../../shared/services/state.service';
import { ModalPage } from '../components/modal/modal';
import { Validation, ValidationState } from './validation.service';

export abstract class ModalService {
  static modal = new ModalPage('modal');

  static appendModal() {
    if (this.checkHash()) window.location.hash = '#cart';
    Validation.isEmptyCart(State.cart) ? this.addDisableButton() : this.addValidButton();
    document.body.append(this.modal.node);
  }

  static checkUnique(product: ProductsData) {
    const result = State.cart.filter((item) => item.id === product.id);
    return result.length === 0;
  }

  private static checkHash() {
    return window.location.hash.slice(1).split('?')[0] !== 'cart';
  }

  static removeModal() {
    ModalService.modal.node.remove();
  }

  static clearModal() {
    this.modal.personalInfo.nameInput.value = '';
    this.modal.personalInfo.phoneInput.value = '';
    this.modal.personalInfo.addressInput.value = '';
    this.modal.personalInfo.emailInput.value = '';
    this.modal.cardInfo.number.value = '';
    this.modal.cardInfo.cardName.node.innerText = 'Card type:';
    this.modal.cardInfo.cardMounthYear.value = '';
    this.modal.cardInfo.cvv.value = '';
  }

  static removeMessage() {
    Array.from(document.querySelectorAll('.personal-info__error')).forEach((item) => item.remove());
  }

  static removeSumbitMessage() {
    Array.from(this.modal.cardInfo.node.querySelectorAll('.personal-info__error')).forEach((item) => item.remove());
  }

  private static addDisableButton() {
    (this.modal.submit.node as HTMLButtonElement).disabled = true;
    this.modal.submit.node.innerText = 'Bag is empty';
    this.modal.submit.node.style.opacity = '0.5';
  }

  private static addValidButton() {
    (this.modal.submit.node as HTMLButtonElement).disabled = false;
    this.modal.submit.node.innerText = 'Submit';
    this.modal.submit.node.style.opacity = '1';
    this.modal.submit.node.addEventListener('click', () => {
      const state = Validation.getState();
      Validation.checkAllValidity(state, this.modal.cardInfo.cardContainer.node);
    });
  }

  public static appendErrors(state: ValidationState) {
    this.removeMessage();
    if (!state.name) Validation.createValidationMessage(this.modal.personalInfo.nameContainer.node, '✖ Invalid');
    if (!state.phone) Validation.createValidationMessage(this.modal.personalInfo.phoneContainer.node, '✖ Invalid');
    if (!state.address) Validation.createValidationMessage(this.modal.personalInfo.addressContainer.node, '✖ Invalid');
    if (!state.email) Validation.createValidationMessage(this.modal.personalInfo.emailContainer.node, '✖ Invalid');
    let message = '';
    if (!state.cardNumber) message = message + 'card ';
    if (!state.mounth) message = message + 'thru ';
    if (!state.cvv) message = message + 'cvv ';
    if (message.length) message = '✖ Invalid in ' + message;
    Validation.createValidationMessage(this.modal.cardInfo.cardContainer.node, message);
  }
}
