import { DOMElement } from './dom-element';
import { ButtonOptions } from '../../models/base-elements';

export class ButtonElement extends DOMElement {
  constructor(parentNode: HTMLElement | null, options: ButtonOptions) {
    super(parentNode, {
      tagName: options.tagName,
      classList: options.classList,
      content: options.content,
    });

    if (options.id) {
      this.node.id = options.id;
    }

    if (options.type) {
      this.node.setAttribute('type', options.type);
    }
  }
}
