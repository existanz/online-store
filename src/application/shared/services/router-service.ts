export default class RouterSvc {
  private idPage: string;
  private query: string;
  private path: string;

  constructor() {
    this.idPage = 'store';
    this.query = '$options=true';
    this.path = this.idPage + this.query;
    this.routChange();
  }

  public routChange() {
    console.log('hash is changed');
    const fullHash = window.location.hash.slice(1);
    this.idPage = fullHash.indexOf('?') ? fullHash.split('?')[0] : fullHash;
    this.query = fullHash[1];
    const options: string[] = this.query.split('&');
    this.path = this.idPage + this.query;
    console.log(this.idPage, options);
    return { idPage: this.idPage, query: this.query };
  }
}
