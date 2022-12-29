import { ProductsData } from '../../../shared/models/response-data';
import { RangeSliderInterFace } from '../../../shared/models/store-page';

export abstract class RangeFilterService {
  static priceState: RangeSliderInterFace;
  static stockState: RangeSliderInterFace;

  static pickPrice(data: ProductsData[]) {
    this.priceState = {
      min: data.reduce((x, y) => Math.min(x, y.price), 0),
      max: data.reduce((x, y) => Math.max(x, y.price), 0),
    };
    return this.priceState;
  }

  static pickStock(data: ProductsData[]) {
    this.priceState = {
      min: data.reduce((x, y) => Math.min(x, y.stock), 0),
      max: data.reduce((x, y) => Math.max(x, y.stock), 0),
    };
    return this.priceState;
  }
}
