import CartService from '../../main/services/cart-page/cart.service';
import { ResponseData, ProductsData } from '../models/response-data';
import LocalStorageSvc from './local-storage.service';

class State {
  public allData: ProductsData[];
  public current: ProductsData[];
  public cart: ProductsData[];
  public localStorageSVC: LocalStorageSvc;

  constructor() {
    this.allData = [];
    this.current = [];
    this.cart = [];
    this.localStorageSVC = new LocalStorageSvc();
  }

  public async load() {
    const url = 'https://dummyjson.com/products?limit=100';
    await fetch(url)
      .then((res) => res.json())
      .then((data: ResponseData) => (this.allData = data.products));

    this.current = this.allData;

    this.cart = [];
    CartService.load();
  }

  public getCurrent() {
    return this.current;
  }

  public getProductByID(idProd: number): ProductsData {
    const res = this.allData.find((product) => product.id === idProd);
    if (res) return res;
    else return this.current[0];
  }
}

const stateService = new State();
export default stateService;
