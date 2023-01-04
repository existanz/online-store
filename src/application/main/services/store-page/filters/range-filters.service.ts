import { ProductsData } from '../../../../shared/models/response-data';
import { RangeSliderInterFace } from '../../../../shared/models/store-page';

export abstract class RangeFilterService {
  static priceState: RangeSliderInterFace;
  static stockState: RangeSliderInterFace;

  static pickPrice(data: ProductsData[]) {
    this.priceState = {
      max: data.reduce((x, y) => Math.max(x, y.price), 0),
      min: data.reduce(
        (x, y) => Math.min(x, y.price),
        data.reduce((x, y) => Math.max(x, y.price), 0)
      ),
    };
    return this.priceState;
  }

  static pickStock(data: ProductsData[]) {
    this.priceState = {
      max: data.reduce((x, y) => Math.max(x, y.stock), 0),
      min: data.reduce(
        (x, y) => Math.min(x, y.stock),
        data.reduce((x, y) => Math.max(x, y.stock), 0)
      ),
    };
    return this.priceState;
  }

  static pickData(e: Event, state: string) {
    let min = (document.querySelector('.range-filter__range-input-min') as HTMLInputElement).value;
    let max = (document.querySelector('.range-filter__range-input-max') as HTMLInputElement).value;
    if ((e.target as HTMLElement).closest('.range-filter__range-input-min')) {
      min = (e.target as HTMLInputElement).value;
    }
    if ((e.target as HTMLElement).closest('.range-filter__range-input-max')) {
      max = (e.target as HTMLInputElement).value;
    }

    if (state == 'price') {
      this.priceState = {
        min: parseInt(min),
        max: parseInt(max),
      };
    } else {
      this.stockState = {
        min: parseInt(min),
        max: parseInt(max),
      };
    }
  }
}
