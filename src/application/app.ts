import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import LocalStorageSvc from './shared/services/local-storage.service';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;
  public localStorageSvc;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);
    this.localStorageSvc = new LocalStorageSvc();
  }

  private render(): void {
    // рендер остального содержимого относительно кверизапроса, стостояния localStorage и.т.д.
  }

  public start(): void {
    this.render();
  }
}

export default App;
