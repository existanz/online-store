import { Options } from '../../models/base-elements';

export class DOMElement {
  public node: HTMLElement;

  constructor(parentNode: HTMLElement | null, options: Options) {
    const el = document.createElement(options.tagName);
    if (options.classList) {
      el.classList.add(...options.classList);
    }
    if (options.content) {
      el.textContent = options.content;
    }
    if (parentNode) {
      parentNode.appendChild(el);
    }
    this.node = el;
  }
}
