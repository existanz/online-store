import { ProductsData } from '../../../../shared/models/response-data';
import stateService from '../../../../shared/services/state.service';

class SortService {
  public currentSort: string;

  constructor() {
    this.currentSort = 'default';
  }

  public sort(type: string) {
    if (type === this.currentSort) return stateService.current;
    let newState: ProductsData[] | null = stateService.current;

    switch (type) {
      case 'price-decrease':
        this.currentSort = type;
        newState = this.priceDecreaseSort();
        break;
      case 'price-increase':
        this.currentSort = type;
        newState = this.priceIncreaseSort();
        break;
      case 'name-a':
        this.currentSort = type;
        newState = this.priceAZSort();
        break;
      case 'name-z':
        this.currentSort = type;
        newState = this.priceZASort();
        break;
      case 'default':
      default:
        break;
    }

    return newState;
  }

  private priceDecreaseSort() {
    return stateService.current.sort((a, b) => a.price - b.price);
  }

  private priceIncreaseSort() {
    return stateService.current.sort((a, b) => b.price - a.price);
  }

  private priceAZSort() {
    return stateService.current.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
  }

  private priceZASort() {
    return stateService.current.sort((a, b) => b.title.charCodeAt(0) - a.title.charCodeAt(0));
  }
}

const sortService = new SortService();
export default sortService;
