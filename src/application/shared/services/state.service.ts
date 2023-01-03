import CartService from '../../main/services/cart-page/cart.service';
import { ResponseData, ProductsData } from '../models/response-data';
import LocalStorageSvc from './local-storage.service';

export abstract class State {
  static allData: ProductsData[];
  static current: ProductsData[];
  static cart: ProductsData[];
  static localStorageSVC = new LocalStorageSvc();

  static async load() {
    const url = 'https://dummyjson.com/products?limit=100';
    await fetch(url)
      .then((res) => res.json())
      .then((data: ResponseData) => (this.allData = data.products));

    // смотрим квери запрос, обрабатываем allData и присваиваем в current. если запроса нет, то просто присваиваем allData
    this.current = this.allData;

    //перенес загрузку корзины в картсервис
    this.cart = [];
    CartService.load();
  }

  static getProductByID(idProd: number): ProductsData {
    const res = this.allData.find((product) => product.id === idProd);
    if (res) return res;
    else return this.current[0];
  }
}
