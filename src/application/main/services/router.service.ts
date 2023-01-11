export default class RouterService {
  public idPage: string;
  private query: string;
  private idProd: number;
  private prodsPerPage: number;
  private curPage: number;

  constructor() {
    this.idPage = 'store';
    this.query = '';
    this.routChange();
    this.idProd = 1;
    this.prodsPerPage = 3;
    this.curPage = 1;
  }

  public routChange() {
    const hash: string = window.location.hash.slice(1);
    if (hash.indexOf('?')) {
      this.idPage = hash.split('?')[0];
      this.query = hash.split('?')[1];
    } else {
      this.idPage = hash;
    }

    return { idPage: this.idPage, query: this.query };
  }

  public getProdId() {
    if (this.idPage === 'product' && this.query) {
      if (this.query.split('=')[0] === 'idProd') this.idProd = parseInt(this.query.split('=')[1]);
    }
    return this.idProd;
  }

  public getCartOptions() {
    if (this.idPage === 'cart' && this.query) {
      const CartOptions = this.query.split('&');
      if (CartOptions[0].split('=')[0] === 'prodPerPage') this.prodsPerPage = parseInt(CartOptions[0].split('=')[1]);
      if (CartOptions[1].split('=')[0] === 'prodPerPage') this.curPage = parseInt(CartOptions[1].split('=')[1]);
    }
    return [this.prodsPerPage, this.curPage];
  }
}
