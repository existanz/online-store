import { State } from '../../../shared/services/state.service';
import { CheckboxFilterService } from './filters/checkbox-filters.service';

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

    console.log(State.current);
  }
}
