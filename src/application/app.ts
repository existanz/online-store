import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import { ProductPage } from './main/pages/product-page/product-page';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;

  private productPage: ProductPage;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);
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
