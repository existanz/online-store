import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import { StorePage } from './main/pages/store-page/store-page';
import LocalStorageSvc from './shared/services/local-storage.service';
import RouterSvc from './shared/services/router-service';
import { ProductPage } from './main/pages/product-page/product-page';
import PageRenderer from './shared/services/pages-renderer';
import { NotFoundPage } from './main/pages/not-found/not-found';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;
  private store: StorePage;
  public localStorageSvc: LocalStorageSvc;
  public routerSvc: RouterSvc;
  private productPage: ProductPage;
  private pageRenderer: PageRenderer;
  private notFoundPage: NotFoundPage;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);
    this.routerSvc = new RouterSvc();
    this.store = new StorePage('store-page');
    this.localStorageSvc = new LocalStorageSvc();
    this.productPage = new ProductPage('product-page');
    this.pageRenderer = new PageRenderer(this.main.container.node);
    this.notFoundPage = new NotFoundPage('this.main.container.node');
  }

  private render(): void {
    this.pageRenderer.render(this.routerSvc.routChange().idPage);
    this.notFoundPage = new NotFoundPage('not-found-page');
  }

  public start(): void {
    this.render();
    window.addEventListener('hashchange', () => this.render());
  }
}

export default App;
