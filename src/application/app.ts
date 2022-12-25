import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import { StorePage } from './main/pages/store-page/store-page';
import LocalStorageSvc from './shared/services/local-storage.service';
import RouterSvc from './shared/services/router-service';
import { ProductPage } from './main/pages/product-page/product-page';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;
  private store: StorePage;
  public localStorageSvc: LocalStorageSvc;
  public routerSvc: RouterSvc;
  private productPage: ProductPage;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);
    this.routerSvc = new RouterSvc();
    this.store = new StorePage('store-page');
    this.localStorageSvc = new LocalStorageSvc();
    window.addEventListener('hashchange', this.routerSvc.routChange);
    this.productPage = new ProductPage('product-page');
  }

  private render(): void {
    this.main.container.node.append(this.productPage.container.node);
  }

  public start(): void {
    this.render();
  }
}

export default App;
