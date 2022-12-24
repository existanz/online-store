export default class RouterSvc {
  private idPage: string;
  private query: string;
  private path: string;

  constructor() {
    this.idPage = '#main';
    this.query = '$options';
    this.path = this.idPage + this.query;
    this.routChange();
  }

  public routChange() {
    console.log('hash is changed');
    const fullHash = window.location.hash.slice(1).split('?');
    this.idPage = fullHash[0];
    this.query = fullHash[1];
    const options: string[] = this.query.split('&');
    this.path = this.idPage + this.query;
    console.log(this.idPage, options);
  }
}
