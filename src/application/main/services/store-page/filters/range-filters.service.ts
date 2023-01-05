import { ProductsData } from '../../../../shared/models/response-data';
import { RangeSliderInterFace } from '../../../../shared/models/store-page';
import { State } from '../../../../shared/services/state.service';

export abstract class RangeFilterService {
  static priceState: RangeSliderInterFace;
  static stockState: RangeSliderInterFace;

  static pickPrice(data: ProductsData[]) {
    RangeFilterService.priceState = {
      max: data.reduce((x, y) => Math.max(x, y.price), 0),
      min: data.reduce(
        (x, y) => Math.min(x, y.price),
        data.reduce((x, y) => Math.max(x, y.price), 0)
      ),
    };
    return RangeFilterService.priceState;
  }

  static pickStock(data: ProductsData[]) {
    RangeFilterService.priceState = {
      max: data.reduce((x, y) => Math.max(x, y.stock), 0),
      min: data.reduce(
        (x, y) => Math.min(x, y.stock),
        data.reduce((x, y) => Math.max(x, y.stock), 0)
      ),
    };
    return RangeFilterService.priceState;
  }

  static pickData(e: Event, state: string) {
    RangeFilterService.priceState = RangeFilterService.pickPrice(State.current);
    RangeFilterService.stockState = RangeFilterService.pickStock(State.current);

    let { max: maxPrice, min: minPrice } = RangeFilterService.priceState;
    let { max: maxStock, min: minStock } = RangeFilterService.stockState;

    if ((e.target as HTMLElement).closest('.range-filter__range-input-min') && state === 'price') {
      minPrice = Number((e.target as HTMLInputElement).value);
      maxPrice = Number(((e.target as HTMLInputElement).nextSibling as HTMLInputElement).value);
    }
    if ((e.target as HTMLElement).closest('.range-filter__range-input-max') && state === 'price') {
      maxPrice = Number((e.target as HTMLInputElement).value);
      minPrice = Number(((e.target as HTMLInputElement).previousSibling as HTMLInputElement).value);
    }

    if ((e.target as HTMLElement).closest('.range-filter__range-input-min') && state === 'stock') {
      minStock = Number((e.target as HTMLInputElement).value);
      maxStock = Number(((e.target as HTMLInputElement).nextSibling as HTMLInputElement).value);
    }

    if ((e.target as HTMLElement).closest('.range-filter__range-input-max') && state === 'stock') {
      maxStock = Number((e.target as HTMLInputElement).value);
      minStock = Number(((e.target as HTMLInputElement).previousSibling as HTMLInputElement).value);
    }

    RangeFilterService.priceState = {
      max: maxPrice,
      min: minPrice,
    };

    RangeFilterService.stockState = {
      max: maxStock,
      min: minStock,
    };
  }
}
