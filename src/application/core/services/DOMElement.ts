export class DOMElement {
    public node: HTMLElement;

    constructor(parentNode: HTMLElement | null, tagName = 'div', classList: string[] = [], content = '') {
        const el = document.createElement(tagName);
        el.classList.add(...classList);
        el.textContent = content;
        if (parentNode) {
            parentNode.appendChild(el);
        }
        this.node = el;
    }
}
