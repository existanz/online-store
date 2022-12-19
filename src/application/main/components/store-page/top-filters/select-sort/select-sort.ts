import { InputElement } from '../../../../../shared/components/base-elements/input-element';

export class SelectSort {
  private select: InputElement;
  private option: InputElement;

  constructor(parentNode: HTMLElement) {
    this.select = new InputElement(parentNode, {
      tagName: 'select',
      classList: ['select-sort'],
    });

    this.option = new InputElement(this.select.node, {
      tagName: 'option',
      classList: ['select-sort__option'],
      value: 'sort-1',
      content: 'sort-1',
    });

    this.option = new InputElement(this.select.node, {
      tagName: 'option',
      classList: ['select-sort__option'],
      value: 'sort-2',
      content: 'sort-2',
    });

    this.option = new InputElement(this.select.node, {
      tagName: 'option',
      classList: ['select-sort__option'],
      value: 'sort-3',
      content: 'sort-3',
    });

    this.option = new InputElement(this.select.node, {
      tagName: 'option',
      classList: ['select-sort__option'],
      value: 'sort-4',
      content: 'sort-4',
    });

    this.option = new InputElement(this.select.node, {
      tagName: 'option',
      classList: ['select-sort__option'],
      value: 'sort-5',
      content: 'sort-5',
    });
  }
}
