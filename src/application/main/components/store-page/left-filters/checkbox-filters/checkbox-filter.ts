import './checkbox-filter.scss';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../../shared/components/base-elements/input-element';
import { Options } from '../../../../../shared/models/store-page';

export class CheckboxFilter {
  private container: DOMElement;
  private title: DOMElement;
  private list: DOMElement;
  private label: DOMElement | null;
  private customCheckbox: DOMElement | null;
  private checkboxName: DOMElement | null;
  private checkboxCount: DOMElement | null;

  private input: InputElement | null;

  constructor(parentNode: HTMLElement, checkboxOptions: Options) {
    this.container = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['checkbox-filter'],
    });

    this.title = new DOMElement(this.container.node, {
      tagName: 'span',
      classList: ['checkbox-filter__title'],
      content: checkboxOptions.title,
    });

    this.list = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['checkbox-filter__container'],
    });

    this.label = null;
    this.input = null;
    this.customCheckbox = null;
    this.checkboxName = null;
    this.checkboxCount = null;

    this.render(6);
  }

  public render(count: number): void {
    // рендерим чекбоксы, которые есть в data
    // временный рендер
    for (let i = 0; i < count; i++) {
      this.label = new DOMElement(this.list.node, {
        tagName: 'label',
        classList: ['checkbox-filter__label'],
      });

      this.input = new InputElement(this.label.node, {
        tagName: 'input',
        type: 'checkbox',
        classList: ['checkbox-filter__checkbox'],
      });

      this.customCheckbox = new DOMElement(this.label.node, {
        tagName: 'div',
        classList: ['checkbox-filter__custom-check'],
      });

      this.checkboxName = new DOMElement(this.label.node, {
        tagName: 'p',
        classList: ['checkbox-filter__category-name'],
        content: `category-${i + 1}`,
      });

      this.checkboxCount = new DOMElement(this.label.node, {
        tagName: 'span',
        classList: ['checkbox-filter__category-count'],
        content: '3333',
      });
    }
  }
}
