import './footer.scss';
import { DOMElement } from '../../../shared/components/DOMElement';

export class Footer extends DOMElement {
  gitHub: DOMElement = new DOMElement(this.node, 'a', ['footer__link']);

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', ['footer'], 'this.gitHub');
  }
}
