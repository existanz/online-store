export default class RouterService {
  public idPage: string;
  private query: string;

  constructor() {
    this.idPage = 'store';
    this.query = '';
    this.routChange();
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
}
