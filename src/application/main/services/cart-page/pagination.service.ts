import { ProductsData } from '../../../shared/models/response-data';

export default abstract class PaginationService {
  static productsPerPage = 3;
  static curPage = 1;

  static getCurPageProducts(data: ProductsData[]) {
    const rem: number = data.length % this.productsPerPage;
    const startId: number = this.productsPerPage * (this.curPage - 1);
    const endId: number = startId + Math.max(this.productsPerPage, rem);
    return data.slice(startId, endId);
  }

  static getMaxPage(data: ProductsData[]) {
    return Math.ceil(data.length / this.productsPerPage);
  }
}
