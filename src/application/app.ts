import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { Main } from './core/components/main-container/main-container';
import { Router } from './main/router/router';
import { State } from './shared/services/state.service';
import { Querry } from './shared/services/querry.service';

class App {
  private header: Header;
  private main: Main;
  private footer: Footer;

  private router: Router | null;

  constructor() {
    this.header = new Header(document.body);
    this.main = new Main(document.body);
    this.footer = new Footer(document.body);

    this.router = null;
  }

  public async start() {
    await State.load();
    Querry.loadStateFromQuerry();
    this.router = new Router(this.main.container);
    this.header.render();
  }
}

export default App;
