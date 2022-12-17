import { Header } from './core/components/header/header';

class App {
  private header: Header;

  constructor() {
    this.header = new Header(document.body);
  }

  private render(): void {
    // рендер остального содержимого относительно кверизапроса, стостояния localStorage и.т.д.
  }

  public start(): void {
    this.render();
  }
}

export default App;
