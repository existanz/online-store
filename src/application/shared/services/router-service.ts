export default class RouterSvc {
  public idPage: string;
  private query: string;

  constructor() {
    this.idPage = 'store';
    this.query = '';
    this.routChange();
  }

  public routChange() {
    console.log('hash is changed');
    const hash = window.location.hash.slice(1);
    this.idPage = hash.indexOf('?') ? hash.split('?')[0] : hash;
    this.query = hash[1];
    const options: string[] = this.query.split('&');
    console.log(this.idPage, options);
    return { idPage: this.idPage, query: this.query };
  }
}
