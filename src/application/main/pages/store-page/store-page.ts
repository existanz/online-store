import { Page } from '../../../shared/components/page';

export class StorePage extends Page {
  constructor(id: string) {
    super(id);
    this.container.node.innerText = 'main-page';
  }
}
