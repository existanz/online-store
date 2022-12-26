import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import { NotFoundPage } from './main/pages/not-found/not-found';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;

  private notFoundPage: NotFoundPage;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);
    this.notFoundPage = new NotFoundPage('not-found-page');
  }

  private render(): void {
    this.main.container.node.append(this.notFoundPage.container.node);
  }

  public start(): void {
    this.render();
  }
}

export default App;
