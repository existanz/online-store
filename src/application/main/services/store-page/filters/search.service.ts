import stateService from '../../../../shared/services/state.service';

class SearchService {
  public searchState: string;

  constructor() {
    this.searchState = '';
  }

  public search(value: string) {
    this.searchState = value.toLowerCase().trim();
    stateService.current = stateService.current.filter(
      (item) =>
        item.title.toLowerCase().includes(this.searchState) ||
        item.brand.toLowerCase().includes(this.searchState) ||
        item.category.toLowerCase().includes(this.searchState) ||
        item.description.toLowerCase().includes(this.searchState) ||
        item.price.toString().toLowerCase().includes(this.searchState) ||
        item.stock.toString().toLowerCase().includes(this.searchState)
    );
    return stateService.current;
  }
}

const searchService = new SearchService();
export default searchService;
