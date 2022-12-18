import { Footer } from './core/components/footer/footer';

class App {
  footer: Footer = new Footer(document.body);

  public start() {
    console.log('start');
  }
}

export default App;
