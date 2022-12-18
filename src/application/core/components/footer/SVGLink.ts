import { DOMElement } from '../../../shared/components/DOMElement';

export class SVGLink extends DOMElement {
  linkP: DOMElement;
  constructor(parentNode: HTMLElement, href: string, linkText: string, svgIco: string) {
    super(parentNode, 'a', ['footer__link']);
    this.linkP = new DOMElement(this.node, 'p', ['footer__names'], linkText);
    this.node.setAttribute('href', href);
    this.node.innerHTML = svgIco + this.node.innerHTML;
  }
}
