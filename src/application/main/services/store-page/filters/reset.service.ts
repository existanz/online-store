import { State } from '../../../../shared/services/state.service';
import { CheckboxFilterService } from './checkbox-filters.service';
import { SearchService } from './search.service';
// import { RangeFilterService } from "./range-filters.service";
import { SortService } from './sort.service';

export abstract class ResetService {
  static reset() {
    State.current = State.allData;
    CheckboxFilterService.checkedCategories = [];
    CheckboxFilterService.checkedBrands = [];
    (document.querySelector('.select-sort__input') as HTMLInputElement).value = '';
    SortService.currentSort = '';
    (document.querySelector('.search__input') as HTMLInputElement).value = '';
    SearchService.searchState = '';
    // скинуть состояние до grid-view
    // скинуть range

    return State.current;
  }
}
