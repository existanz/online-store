import viewService from '../../main/services/store-page/change-view.service';
import checkboxFilterService from '../../main/services/store-page/filters/checkbox-filters.service';
import rangeFilterService from '../../main/services/store-page/filters/range-filters.service';
import searchService from '../../main/services/store-page/filters/search.service';
import sortService from '../../main/services/store-page/filters/sort.service';
import updateData from '../../main/services/store-page/update-view.service';
import { StoreQuerry } from '../models/querry';
import stateService from './state.service';

class Querry {
  public store: StoreQuerry = {
    category: null,
    brand: null,
    price: null,
    stock: null,
    view: null,
    search: null,
    sort: null,
  };

  public setStoreQuerry(param: keyof StoreQuerry, value: string[]) {
    this.store[param] = value;
    const querry: string[] = [];
    let key: keyof StoreQuerry;
    for (key in this.store) {
      if (this.store[key]) {
        if (this.store[key]?.length) {
          querry.push(`${key}=${this.store[key]?.join(',')}`);
        }
      }
    }
    window.location.hash = querry.length ? '#store?' + querry.join('%') : '#store';
  }

  public updateQuerry() {
    this.setStoreQuerry('brand', checkboxFilterService.checkedBrands);
    this.setStoreQuerry('category', checkboxFilterService.checkedCategories);

    rangeFilterService.stockState = rangeFilterService.pickStock(stateService.current);
    this.setStoreQuerry('stock', [
      rangeFilterService.stockState.min.toString(),
      rangeFilterService.stockState.max.toString(),
    ]);

    rangeFilterService.priceState = rangeFilterService.pickPrice(stateService.current);
    this.setStoreQuerry('price', [
      rangeFilterService.priceState.min.toString(),
      rangeFilterService.priceState.max.toString(),
    ]);

    this.setStoreQuerry('search', [searchService.searchState]);

    this.setStoreQuerry('view', [viewService.currentView]);
    this.setStoreQuerry('sort', [sortService.currentSort]);
  }

  public async loadStateFromQuerry() {
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

    rangeFilterService.priceState = rangeFilterService.pickPrice(stateService.allData);
    if (this.store.price) {
      rangeFilterService.priceState = {
        min: Number(this.store.price[0]),
        max: Number(this.store.price[1]),
      };
    }
    rangeFilterService.stockState = rangeFilterService.pickStock(stateService.allData);
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
    stateService.current = newState;
  }
}

const querryService = new Querry();
export default querryService;
