import { ProductsData } from '../../shared/models/response-data';
import { State } from '../../shared/services/state.service';
import { ModalPage } from '../components/modal/modal';
import { Validation } from './validation.service';

export abstract class ModalService {
  static modal = new ModalPage('modal');

  static appendModal() {
    if (this.checkHash()) window.location.hash = '#cart';
    Validation.isEmptyCart(State.cart) ? this.addDisableButton() : this.addValidButton();
    Validation.addListeners(this.modal);
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

  private static addDisableButton() {
    (this.modal.submit.node as HTMLButtonElement).disabled = true;
    this.modal.submit.node.innerText = 'Bug is empty';
    this.modal.submit.node.style.opacity = '0.5';
  }

  private static addValidButton() {
    (this.modal.submit.node as HTMLButtonElement).disabled = false;
    this.modal.submit.node.innerText = 'Submit';
    this.modal.submit.node.style.opacity = '1';
    this.modal.submit.node.addEventListener('click', Validation.checkAllValidity);
  }
}
