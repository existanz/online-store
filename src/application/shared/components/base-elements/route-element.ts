import { DOMElement } from './dom-element';
import { RouteOptions } from '../../models/base-elements';

export class RouteElement extends DOMElement {
  constructor(parentNode: HTMLElement | null, options: RouteOptions) {
    super(parentNode, {
      tagName: options.tagName,
      classList: options.classList,
      content: options.content,
    });

    if (options.id) {
      this.node.id = options.id;
    }
  }
}
