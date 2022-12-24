import './buttons.scss';
import { ButtonElement } from '../base-elements/button-element';
import { ButtonOptions } from '../../models/base-elements';

export class WhiteButton extends ButtonElement {
  constructor(parentNode: HTMLElement, options: ButtonOptions) {
    super(parentNode, options);
    this.node.classList.add('white-button');
  }
}
