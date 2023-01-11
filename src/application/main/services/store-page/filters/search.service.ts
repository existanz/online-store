import { State } from '../../../../shared/services/state.service';

export class SearchService {
  static searchState: string;

  static search(value: string) {
    this.searchState = value.toLowerCase().trim();
    State.current = State.current.filter(
      (item) =>
        item.title.toLowerCase().includes(this.searchState) ||
        item.brand.toLowerCase().includes(this.searchState) ||
        item.category.toLowerCase().includes(this.searchState) ||
        item.description.toLowerCase().includes(this.searchState) ||
        item.price.toString().toLowerCase().includes(this.searchState) ||
        item.stock.toString().toLowerCase().includes(this.searchState)
    );
    return State.current;
  }
}
