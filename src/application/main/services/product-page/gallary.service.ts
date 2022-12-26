import { ImageElement } from '../../../shared/components/base-elements/image-element';

export class GallaryService {
  static checkUniqueImg(images: string[]): string[] {
    const sizeArr: number[] = [];
    images.forEach((url) => {
      fetch(url).then((res) => {
        sizeArr.push(parseInt(res.headers.get('Content-Length') as string));
      });
    }, {});

    // если останется время, убрать этот волшебный костыль.
    const result: string[] = [];
    setTimeout(() => {
      sizeArr.reduce((arr: number[], size: number, index: number, array: number[]) => {
        if (!arr.includes(size)) {
          arr.push(array[index]);
          result.push(images[index]);
        }
        return arr;
      }, []);
    }, 1000);

    return result;
  }

  static changePhoto(event: Event, container: ImageElement) {
    if (event.target) {
      const src: string = (event.target as HTMLImageElement).getAttribute('src') as string;
      container.node.setAttribute('src', src);
    }
  }
}
