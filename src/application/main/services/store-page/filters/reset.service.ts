import stateService from '../../../../shared/services/state.service';
import viewService from '../change-view.service';
import checkboxFilterService from './checkbox-filters.service';
import searchService from './search.service';
import sortService from './sort.service';

class ResetService {
  public reset() {
    sortService.currentSort = '';
    viewService.view.render(stateService.allData);
    stateService.current = stateService.allData;
    checkboxFilterService.checkedCategories = [];
    checkboxFilterService.checkedBrands = [];
    (document.querySelector('.select-sort__input') as HTMLInputElement).value = '';
    (document.querySelector('.search__input') as HTMLInputElement).value = '';
    searchService.searchState = '';
    viewService.setViewState('grid');
    return stateService.current;
  }
}

const resetService = new ResetService();
export default resetService;
