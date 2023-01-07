import { ProductsData } from '../../shared/models/response-data';
import { State } from '../../shared/services/state.service';
import { ModalPage } from '../components/modal/modal';

export abstract class ModalService {
  static modal = new ModalPage('modal');

  static appendModal() {
    if (this.checkHash()) window.location.hash = '#cart';
    document.body.append(this.modal.node);
  }

  static checkUnique(product: ProductsData) {
    const result = State.cart.filter((item) => item.id === product.id);
    return result.length === 0;
  }

  private static checkHash() {
    return window.location.hash.slice(1).split('?')[0] === 'product';
  }

  static removeModal() {
    ModalService.modal.node.remove();
  }
}
