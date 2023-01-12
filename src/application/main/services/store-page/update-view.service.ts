import { State } from '../../../shared/services/state.service';
import checkboxFilterService from './filters/checkbox-filters.service';
import { RangeFilterService } from './filters/range-filters.service';

export class UpdateData {
  static update() {
    State.current = State.allData;

    if (checkboxFilterService.checkedCategories.length) {
      State.current = State.current.filter((item) =>
        checkboxFilterService.checkedCategories.includes(item.category.split(' ').join('-').toLowerCase())
      );
    }

    if (checkboxFilterService.checkedBrands.length) {
      State.current = State.current.filter((item) =>
        checkboxFilterService.checkedBrands.includes(item.brand.split(' ').join('-').toLowerCase())
      );
    }

    return State.current;
  }

  static updatePrice() {
    State.current = State.current.filter((item) => {
      return item.price >= RangeFilterService.priceState.min && item.price <= RangeFilterService.priceState.max;
    });
    return State.current;
  }

  static updateStock() {
    State.current = State.current.filter((item) => {
      return item.stock >= RangeFilterService.stockState.min && item.stock <= RangeFilterService.stockState.max;
    });
    return State.current;
  }

  static updateProductCounter() {
    (document.querySelector('.total-products') as HTMLElement).innerText = `Products: ${State.current.length}`;
  }
}
