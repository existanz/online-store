import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import { CartPage } from './main/pages/cart-page/cart-page';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;

  private cartPage: CartPage;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);
    this.cartPage = new CartPage('cart-page');
  }

  private render(): void {
    this.main.container.node.append(this.cartPage.container.node);
  }

  public start(): void {
    this.render();
  }
}

export default App;
