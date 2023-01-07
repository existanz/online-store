import { ProductsData } from '../../../../shared/models/response-data';
import { State } from '../../../../shared/services/state.service';

export abstract class SortService {
  static currentSort: string;

  static sort(type: string) {
    if (type === this.currentSort) type = 'default';
    let newState: ProductsData[] | null = null;

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

  private static priceDecreaseSort() {
    return State.current.sort((a, b) => a.price - b.price);
  }

  private static priceIncreaseSort() {
    return State.current.sort((a, b) => b.price - a.price);
  }

  private static priceAZSort() {
    return State.current.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
  }

  private static priceZASort() {
    return State.current.sort((a, b) => b.title.charCodeAt(0) - a.title.charCodeAt(0));
  }
}
