import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import { StorePage } from './main/pages/store-page/store-page';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;

  private store: StorePage;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);

    this.store = new StorePage('store-page');
  }

  private render(): void {
    this.main.container.node.append(this.store.container.node);
  }

  public start(): void {
    this.render();
  }
}

export default App;
