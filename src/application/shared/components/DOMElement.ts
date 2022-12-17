interface Options {
  tagName: keyof HTMLElementTagNameMap;
  classList?: string[];
  content?: string;
  href?: string;
}

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
    if (options.href) {
      el.setAttribute('href', options.href);
    }
    this.node = el;
  }
}
