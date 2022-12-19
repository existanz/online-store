import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import { StorePage } from './main/pages/store-page/store-page';

class App {
  private header: Header = new Header(document.body);
  private main: Main = new Main(document.body);
  private footer: Footer = new Footer(document.body);

  private store: StorePage = new StorePage('store-page');

  private render(): void {
    this.main.container.node.append(this.store.container.node);
  }

  public start(): void {
    this.render();
  }
}

export default App;
