import './select-sort.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../../shared/components/base-elements/input-element';

export class SelectSort extends DOMElement {
  private selectHeader: DOMElement;
  private selectContainer: DOMElement;
  private arrow: DOMElement;

  private selectInput: InputElement;
  private option: InputElement;

  constructor(parentNode: HTMLElement) {
    super(parentNode, {
      tagName: 'div',
      classList: ['select-sort'],
    });

    this.selectHeader = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['select-sort__header'],
      content: 'Sort by:',
    });

    this.selectContainer = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['select-sort__container'],
    });

    this.selectInput = new InputElement(this.selectContainer.node, {
      tagName: 'select',
      classList: ['select-sort__input'],
    });

    this.option = new InputElement(this.selectInput.node, {
      tagName: 'option',
      classList: ['select-sort__option'],
      value: 'price-2',
      content: 'price',
    });

    this.option = new InputElement(this.selectInput.node, {
      tagName: 'option',
      classList: ['select-sort__option'],
      value: 'price-2',
      content: 'price',
    });

    this.option = new InputElement(this.selectInput.node, {
      tagName: 'option',
      classList: ['select-sort__option'],
      value: 'name-1',
      content: 'name',
    });

    this.option = new InputElement(this.selectInput.node, {
      tagName: 'option',
      classList: ['select-sort__option'],
      value: 'name-2',
      content: 'name',
    });

    this.arrow = new DOMElement(this.selectContainer.node, {
      tagName: 'div',
      classList: ['select-sort__custom-arrow'],
    });
  }
}
