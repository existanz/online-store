import { ResponseData, ProductsData } from '../models/response-data';

export abstract class State {
  static allData: ProductsData[];
  static current: ProductsData[];
  static cart: ProductsData[];

  static async load() {
    const url = 'https://dummyjson.com/products?limit=100';
    await fetch(url)
      .then((res) => res.json())
      .then((data: ResponseData) => (this.allData = data.products));

    // смотрим квери запрос, обрабатываем allData и присваиваем в current. если запроса нет, то просто присваиваем allData
    this.current = this.allData;
    // смотрим localStorage присваиваем данные в cart, если нет, то просто присваиваем пустой массив
    this.cart = [];
  }

  static getProductByID(idProd: number): ProductsData {
    const res = this.allData.find((product) => product.id === idProd);
    if (res) return res;
    else return this.current[0];
  }
}
