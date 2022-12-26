import './not-found.scss';
import { DOMElement } from '../../../shared/components/base-elements/dom-element';
import { Page } from '../../../shared/components/page';

export class NotFoundPage extends Page {
  private title: DOMElement;
  private subtitle: DOMElement;

  constructor(id: string) {
    super(id);

    this.title = new DOMElement(this.container.node, {
      tagName: 'h3',
      classList: ['not-found-page__title'],
      content: 'No results',
    });

    this.subtitle = new DOMElement(this.container.node, {
      tagName: 'p',
      classList: ['not-found-page__subtitle'],
      content: 'something went wrong',
    });
  }
}
