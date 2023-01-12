import { State } from '../../../../shared/services/state.service';
import viewService from '../change-view.service';
import checkboxFilterService from './checkbox-filters.service';
import searchService from './search.service';
import sortService from './sort.service';

class ResetService {
  public reset() {
    sortService.currentSort = '';
    viewService.view.render(State.allData);
    State.current = State.allData;
    checkboxFilterService.checkedCategories = [];
    checkboxFilterService.checkedBrands = [];
    (document.querySelector('.select-sort__input') as HTMLInputElement).value = '';
    (document.querySelector('.search__input') as HTMLInputElement).value = '';
    searchService.searchState = '';
    viewService.setViewState('grid');
    return State.current;
  }
}

const resetService = new ResetService();
export default resetService;
