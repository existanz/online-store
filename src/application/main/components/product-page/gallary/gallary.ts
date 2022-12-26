import './gallary.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { ImageElement } from '../../../../shared/components/base-elements/image-element';
import { ProductsData } from '../../../../shared/models/response-data';
import { GallaryService } from '../../../services/product-page/gallary.service';

export class Gallary extends DOMElement {
  private gallaryList: DOMElement;
  private element: DOMElement | null;
  private image: DOMElement | null;
  private images: string[];
  private mainImage: DOMElement;
  private mainImagePic: ImageElement;

  constructor(parentNode: HTMLElement, data: ProductsData) {
    super(parentNode, {
      tagName: 'div',
      classList: ['gallary'],
    });

    this.gallaryList = new DOMElement(this.node, {
      tagName: 'ul',
      classList: ['gallary__list'],
    });

    this.element = null;
    this.image = null;
    this.images = GallaryService.checkUniqueImg(data.images);
    setTimeout(() => {
      this.render(this.images);
    }, 2000);

    this.mainImage = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['gallary__main-image'],
    });

    this.mainImagePic = new ImageElement(this.mainImage.node, {
      tagName: 'img',
      classList: ['gallary__pic'],
      src: data.images[0],
    });
  }

  private render(images: string[]) {
    images.forEach((item) => {
      this.element = new DOMElement(this.gallaryList.node, {
        tagName: 'li',
        classList: ['gallary__item'],
      });

      this.image = new ImageElement(this.element.node, {
        tagName: 'img',
        classList: ['gallary__small-image'],
        src: item,
      });
      this.element.node.addEventListener('click', (e) => GallaryService.changePhoto(e, this.mainImagePic));
    });
  }
}
