import { RouteElement } from './base-elements/route-element';

export abstract class Page {
  public container: RouteElement;

  constructor(id: string) {
    this.container = new RouteElement(null, {
      tagName: 'div',
      classList: [id],
      id: id,
    });
  }
}
