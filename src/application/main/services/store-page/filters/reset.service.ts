import { State } from '../../../../shared/services/state.service';
import { ViewService } from '../change-view.service';
import checkboxFilterService from './checkbox-filters.service';
import searchService from './search.service';
import { SortService } from './sort.service';

class ResetService {
  public reset() {
    SortService.currentSort = '';
    ViewService.view.render(State.allData);
    State.current = State.allData;
    checkboxFilterService.checkedCategories = [];
    checkboxFilterService.checkedBrands = [];
    (document.querySelector('.select-sort__input') as HTMLInputElement).value = '';
    (document.querySelector('.search__input') as HTMLInputElement).value = '';
    searchService.searchState = '';
    ViewService.setViewState('grid');
    return State.current;
  }
}

const resetService = new ResetService();
export default resetService;
