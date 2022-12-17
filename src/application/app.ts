import { Footer } from './core/components/footer/footer';

class App {
  footer: Footer = new Footer(document.querySelector<'body'>('body') as HTMLElement);

  public start() {
    console.log('start');
  }
}

export default App;
