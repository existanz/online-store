import { DOMElement } from './dom-element';
import { LinkOptions } from '../../models/base-elements';

export class LinkElement extends DOMElement {
  constructor(parentNode: HTMLElement | null, options: LinkOptions) {
    super(parentNode, {
      tagName: options.tagName,
      classList: options.classList,
      content: options.content,
    });

    if (options.href) {
      this.node.setAttribute('href', options.href);
    }

    if (options.target) {
      this.node.setAttribute('target', options.target);
    }
  }
}
