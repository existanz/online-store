import { ProductsData } from '../../../shared/models/response-data';
import { State } from '../../../shared/services/state.service';
import CartService from './cart.service';

export default class PaginationService {
  private static _productsPerPage = 3;
  private static _curPage = 1;

  public static getCurPageProducts(data: ProductsData[]) {
    const rem: number = data.length % this._productsPerPage;
    const startId: number = this._productsPerPage * (this.curPage - 1);
    const endId: number = startId + Math.max(this._productsPerPage, rem);
    return data.slice(startId, endId);
  }

  public static getMaxPage(data: ProductsData[]) {
    return Math.max(Math.ceil(data.length / this._productsPerPage), 1);
  }

  public static set curPage(val: number) {
    this._curPage = val;
    if (val < 1) this._curPage = 1;
    if (val > this.getMaxPage(State.cart)) this._curPage = this.getMaxPage(State.cart);
    CartService.save();
  }

  public static get curPage(): number {
    return this._curPage;
  }

  public static set productsPerPage(val: number) {
    if (val >= 1) this._productsPerPage = val;
    if (val < 1 || isNaN(val)) this._productsPerPage = 1;
    if (val > 100) this._productsPerPage = 100;
    CartService.save();
  }

  public static get productsPerPage(): number {
    return this._productsPerPage;
  }
}
