import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../../shared/components/base-elements/image-element';
import { ProductsData } from '../../../../shared/models/response-data';

export class Gallary {
  private gallary: DOMElement;
  private gallaryList: DOMElement;
  private element: DOMElement | null;
  private image: ImageElement | null;

  constructor(parentNode: HTMLElement, data: ProductsData) {
    this.gallary = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['gallary'],
    });

    this.gallaryList = new DOMElement(this.gallary.node, {
      tagName: 'ul',
      classList: ['gallary__list'],
    });

    this.element = null;
    this.image = null;

    this.render(data.images);
  }

  private render(images: string[]) {
    let element = this.element;
    let image = this.image;
    const container = this.gallaryList;
    const imagesSet = [...new Set(images)];
    console.log(imagesSet);
    imagesSet.forEach((item) => {
      element = new DOMElement(container.node, {
        tagName: 'li',
        classList: ['gallary__item'],
      });

      image = new ImageElement(element.node, {
        tagName: 'img',
        classList: ['gallary__small-image'],
        src: item,
      });
    });
  }

  private checkValidity() {
    
  }
}
