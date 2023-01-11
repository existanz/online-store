import { ViewService } from '../../main/services/store-page/change-view.service';
import { CheckboxFilterService } from '../../main/services/store-page/filters/checkbox-filters.service';
import { RangeFilterService } from '../../main/services/store-page/filters/range-filters.service';
import { SearchService } from '../../main/services/store-page/filters/search.service';
import { SortService } from '../../main/services/store-page/filters/sort.service';
import { UpdateData } from '../../main/services/store-page/update-view.service';
import { StoreQuerry } from '../models/querry';
import { State } from './state.service';

export abstract class Querry {
  static store: StoreQuerry = {
    category: null,
    brand: null,
    price: null,
    stock: null,
    view: null,
    search: null,
    sort: null,
  };

  static setStoreQuerry(param: keyof StoreQuerry, value: string[]) {
    Querry.store[`${param}`] = value;
    const querry: string[] = [];
    let key: keyof StoreQuerry;
    for (key in Querry.store) {
      if (Querry.store[`${key}`]) {
        if (Querry.store[`${key}`]?.length) {
          querry.push(`${key}=${Querry.store[`${key}`]?.join(',')}`);
        }
      }
    }
    window.location.hash = querry.length ? '#store?' + querry.join('%') : '#store';
  }

  static updateQuerry() {
    Querry.setStoreQuerry('brand', CheckboxFilterService.checkedBrands);
    Querry.setStoreQuerry('category', CheckboxFilterService.checkedCategories);

    RangeFilterService.stockState = RangeFilterService.pickStock(State.current);
    Querry.setStoreQuerry('stock', [
      RangeFilterService.stockState.min.toString(),
      RangeFilterService.stockState.max.toString(),
    ]);

    RangeFilterService.priceState = RangeFilterService.pickPrice(State.current);
    Querry.setStoreQuerry('price', [
      RangeFilterService.priceState.min.toString(),
      RangeFilterService.priceState.max.toString(),
    ]);

    Querry.setStoreQuerry('search', [SearchService.searchState]);

    Querry.setStoreQuerry('view', [ViewService.currentView]);
    Querry.setStoreQuerry('sort', [SortService.currentSort]);
  }

  static async loadStateFromQuerry() {
    const querry = window.location.hash.split('?')[1];
    if (querry) {
      querry.split('%').reduce((obj, item) => {
        const [key, value] = item.split('=');
        if (key && value) obj[`${key as keyof StoreQuerry}`] = value.split(',');
        return obj;
      }, this.store);
    }
    CheckboxFilterService.checkedCategories = this.store.category ? this.store.category : [];
    CheckboxFilterService.checkedBrands = this.store.brand ? this.store.brand : [];

    RangeFilterService.priceState = RangeFilterService.pickPrice(State.allData);
    if (this.store.price) {
      RangeFilterService.priceState = {
        min: Number(this.store.price[0]),
        max: Number(this.store.price[1]),
      };
    }
    RangeFilterService.stockState = RangeFilterService.pickStock(State.allData);
    if (this.store.stock) {
      RangeFilterService.stockState = {
        min: Number(this.store.stock[0]),
        max: Number(this.store.stock[1]),
      };
    }

    if (this.store.search) {
      SearchService.searchState = this.store.search[0];
    }

    if (this.store.sort) {
      SortService.currentSort = this.store.sort[0];
    }

    if (this.store.view) {
      ViewService.currentView = this.store.view[0] as 'grid' | 'list';
    }

    let newState = UpdateData.update();
    newState = UpdateData.updatePrice();
    newState = UpdateData.updateStock();
    if (SearchService.searchState) {
      newState = SearchService.search(SearchService.searchState);
    }
    SortService.sort(SortService.currentSort);
    State.current = newState;
  }
}
