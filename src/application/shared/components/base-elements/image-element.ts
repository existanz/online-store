import { ImageOptions } from '../../models/base-elements';
import { DOMElement } from './dom-element';

export class ImageElement extends DOMElement {
  constructor(parentNode: HTMLElement | null, options: ImageOptions) {
    super(parentNode, {
      tagName: options.tagName,
      classList: options.classList,
      content: options.content,
    });

    this.node.setAttribute('src', options.src);
    if (options.alt) {
      this.node.setAttribute('alt', options.alt);
    }
  }
}
