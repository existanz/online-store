import { RouteElement } from './base-elements/route-element';

export abstract class Page extends RouteElement {
  constructor(id: string) {
    super(null, {
      tagName: 'div',
      classList: [id],
      id: id,
    });
  }
}
