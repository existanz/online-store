import { State } from '../../../shared/services/state.service';
import { CheckboxFilterService } from './filters/checkbox-filters.service';
import { RangeFilterService } from './filters/range-filters.service';

export abstract class UpdateData {
  static update() {
    State.current = State.allData;

    if (CheckboxFilterService.checkedCategories.length) {
      State.current = State.current.filter((item) =>
        CheckboxFilterService.checkedCategories.includes(item.category.split(' ').join('-').toLowerCase())
      );
    }

    if (CheckboxFilterService.checkedBrands.length) {
      State.current = State.current.filter((item) =>
        CheckboxFilterService.checkedBrands.includes(item.brand.split(' ').join('-').toLowerCase())
      );
    }

    // State.current = State.current.filter((item) => {
    //   return item.price >= RangeFilterService.priceState.min && item.price <= RangeFilterService.priceState.max;
    // });

    // State.current = State.current.filter((item) => {
    //   return item.stock >= RangeFilterService.stockState.min && item.stock <= RangeFilterService.stockState.max;
    // });

    return State.current;
  }

  static updateProductCounter() {
    (document.querySelector('.total-products') as HTMLElement).innerText = `Products: ${State.current.length}`;
  }
}
