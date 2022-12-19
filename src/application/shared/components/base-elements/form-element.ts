import { DOMElement } from './dom-element';
import { FormOptions } from '../../models/base-elements';

export class FormElement extends DOMElement {
  constructor(parentNode: HTMLElement | null, options: FormOptions) {
    super(parentNode, {
      tagName: options.tagName,
      classList: options.classList,
      content: options.content,
    });

    if (options.action) {
      this.node.setAttribute('action', options.action);
    }
  }
}
