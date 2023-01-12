import viewService from '../../main/services/store-page/change-view.service';
import checkboxFilterService from '../../main/services/store-page/filters/checkbox-filters.service';
import rangeFilterService from '../../main/services/store-page/filters/range-filters.service';
import searchService from '../../main/services/store-page/filters/search.service';
import sortService from '../../main/services/store-page/filters/sort.service';
import updateData from '../../main/services/store-page/update-view.service';
import { StoreQuerry } from '../models/querry';
import { State } from './state.service';

export class Querry {
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
    Querry.store[param] = value;
    const querry: string[] = [];
    let key: keyof StoreQuerry;
    for (key in Querry.store) {
      if (Querry.store[key]) {
        if (Querry.store[key]?.length) {
          querry.push(`${key}=${Querry.store[key]?.join(',')}`);
        }
      }
    }
    window.location.hash = querry.length ? '#store?' + querry.join('%') : '#store';
  }

  static updateQuerry() {
    Querry.setStoreQuerry('brand', checkboxFilterService.checkedBrands);
    Querry.setStoreQuerry('category', checkboxFilterService.checkedCategories);

    rangeFilterService.stockState = rangeFilterService.pickStock(State.current);
    Querry.setStoreQuerry('stock', [
      rangeFilterService.stockState.min.toString(),
      rangeFilterService.stockState.max.toString(),
    ]);

    rangeFilterService.priceState = rangeFilterService.pickPrice(State.current);
    Querry.setStoreQuerry('price', [
      rangeFilterService.priceState.min.toString(),
      rangeFilterService.priceState.max.toString(),
    ]);

    Querry.setStoreQuerry('search', [searchService.searchState]);

    Querry.setStoreQuerry('view', [viewService.currentView]);
    Querry.setStoreQuerry('sort', [sortService.currentSort]);
  }

  static async loadStateFromQuerry() {
    const querry = window.location.hash.split('?')[1];
    if (querry) {
      querry.split('%').reduce((obj, item) => {
        const [key, value] = item.split('=');
        if (key && value) obj[key as keyof StoreQuerry] = value.split(',');
        return obj;
      }, this.store);
    }
    checkboxFilterService.checkedCategories = this.store.category ? this.store.category : [];
    checkboxFilterService.checkedBrands = this.store.brand ? this.store.brand : [];

    rangeFilterService.priceState = rangeFilterService.pickPrice(State.allData);
    if (this.store.price) {
      rangeFilterService.priceState = {
        min: Number(this.store.price[0]),
        max: Number(this.store.price[1]),
      };
    }
    rangeFilterService.stockState = rangeFilterService.pickStock(State.allData);
    if (this.store.stock) {
      rangeFilterService.stockState = {
        min: Number(this.store.stock[0]),
        max: Number(this.store.stock[1]),
      };
    }

    if (this.store.search) {
      searchService.searchState = this.store.search[0];
    }

    if (this.store.sort) {
      sortService.currentSort = this.store.sort[0];
    }

    if (this.store.view) {
      viewService.currentView = this.store.view[0] as 'grid' | 'list';
    }

    let newState = updateData.update();
    newState = updateData.updatePrice();
    newState = updateData.updateStock();
    if (searchService.searchState) {
      newState = searchService.search(searchService.searchState);
    }
    sortService.sort(sortService.currentSort);
    State.current = newState;
  }
}
