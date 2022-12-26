import { ButtonElement } from '../../../shared/components/base-elements/button-element';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../shared/components/base-elements/image-element';
import { ResponseData } from '../../../shared/models/response-data';

export class ProductListService {
  static renderList(parantNode: HTMLElement, data?: ResponseData) {
    if (data) {
      data.products.map((product, index) => {
        const item = new DOMElement(parantNode, {
          tagName: 'li',
          classList: ['cart-list__item'],
        });

        const count = new DOMElement(item.node, {
          tagName: 'div',
          classList: ['cart-list__count'],
        });
        count.node.innerText = `${index + 1}`;

        const photo = new ImageElement(item.node, {
          tagName: 'img',
          src: product.images[0],
        });
        photo.node.classList.add('cart-list__image');

        const description = new DOMElement(item.node, {
          tagName: 'div',
        });
        description.node.classList.add('cart-list__description');

        const title = new DOMElement(description.node, {
          tagName: 'h2',
          classList: ['cart-list__item-title'],
        });
        title.node.innerHTML = product.title;

        const desc = new DOMElement(description.node, {
          tagName: 'p',
          classList: ['cart-list__item-desc'],
        });
        desc.node.innerHTML = product.description;

        const price = new DOMElement(description.node, {
          tagName: 'p',
          classList: ['cart-list__price'],
        });
        price.node.innerText = `Price: $${product.price}`;

        const stock = new DOMElement(description.node, {
          tagName: 'p',
          classList: ['cart-list__stock'],
        });
        stock.node.innerText = `In stock: ${product.stock}`;

        const controls = new DOMElement(item.node, {
          tagName: 'div',
          classList: ['cart-list__controls'],
        });

        const minus = new ButtonElement(controls.node, {
          tagName: 'button',
        });
        minus.node.classList.add('cart-list__minus');

        const itemCount = new DOMElement(controls.node, {
          tagName: 'div',
          classList: ['cart-list__item-count'],
        });
        itemCount.node.innerText = '1';

        const plus = new ButtonElement(controls.node, {
          tagName: 'button',
        });
        plus.node.classList.add('cart-list__plus');
      });
    }
  }
}
