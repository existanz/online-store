import { DOMElement } from '../../../shared/components/base-elements/dom-element';

export class SVGLink extends DOMElement {
  linkP: DOMElement;
  constructor(parentNode: HTMLElement, href: string, linkText: string, svgIco: string) {
    super(parentNode, {
      tagName: 'a',
      classList: ['footer__link'],
    });
    this.linkP = new DOMElement(this.node, {
      tagName: 'p',
      classList: ['footer__names'],
      content: linkText,
    });
    this.node.setAttribute('href', href);
    this.node.innerHTML = svgIco + this.node.innerHTML;
  }
}
