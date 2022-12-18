import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';

class App {
  private header: Header = new Header(document.body);
  private footer: Footer = new Footer(document.body);

  private render(): void {
    // рендер остального содержимого относительно кверизапроса, стостояния localStorage и.т.д.
  }

  public start(): void {
    this.render();
  }
}

export default App;
