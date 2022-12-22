import './range-filter.scss';

import { Options } from '../../../../../shared/models/store-page';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../../shared/components/base-elements/input-element';

export class RangeFilter {
  private container: DOMElement;
  private title: DOMElement;
  private wrapper: DOMElement;
  private rangeField: DOMElement;
  public rangeInputMin: InputElement;
  public rangeInputMax: InputElement;
  private inputField: DOMElement;
  private progress: DOMElement;
  private slider: DOMElement;
  public inputMin: InputElement;
  public inputMax: InputElement;

  constructor(parentNode: HTMLElement, rangeOptions: Options) {
    this.container = new DOMElement(parentNode, {
      tagName: 'div',
      classList: ['range-filter'],
    });

    this.title = new DOMElement(this.container.node, {
      tagName: 'span',
      classList: ['range-filter__title'],
      content: rangeOptions.title,
    });

    this.wrapper = new DOMElement(this.container.node, {
      tagName: 'div',
      classList: ['range-filter__container'],
    });

    this.rangeField = new DOMElement(this.wrapper.node, {
      tagName: 'div',
      classList: ['range-filter__range-container'],
    });

    this.slider = new DOMElement(this.rangeField.node, {
      tagName: 'div',
      classList: ['range-filter__slider'],
    });

    this.progress = new DOMElement(this.slider.node, {
      tagName: 'div',
      classList: ['range-filter__progress'],
    });

    this.rangeInputMin = new InputElement(this.rangeField.node, {
      tagName: 'input',
      classList: ['range-filter__range-input-min'],
      type: 'range',
      min: '0',
      max: '10000',
      value: '0',
    });

    this.rangeInputMax = new InputElement(this.rangeField.node, {
      tagName: 'input',
      classList: ['range-filter__range-input-max'],
      type: 'range',
      min: '0',
      max: '10000',
      value: '10000',
    });

    this.inputField = new DOMElement(this.wrapper.node, {
      tagName: 'div',
      classList: ['range-filter__input-container'],
    });

    this.inputMin = new InputElement(this.inputField.node, {
      tagName: 'input',
      type: 'number',
      classList: ['range-filter__input'],
      value: '0',
    });

    this.inputMax = new InputElement(this.inputField.node, {
      tagName: 'input',
      type: 'number',
      classList: ['range-filter__input'],
      value: '10000',
    });

    this.changeRange();
  }

  public changeRange(): void {
    const inputs = [this.rangeInputMin.node, this.rangeInputMax.node];
    const priceInputs = [this.inputMin.node, this.inputMax.node];
    const progress = this.progress.node;
    const checkMinInput = this.inputMin.node;
    const constMax = parseInt((inputs[0] as HTMLInputElement).max);

    const priceGap = 1000;

    inputs.forEach((input) => {
      input.addEventListener('input', (e: Event) => {
        const minVal: number = parseInt((inputs[0] as HTMLInputElement).value as string);
        const maxVal: number = parseInt((inputs[1] as HTMLInputElement).value as string);
        const percentLeft: number = (minVal / parseInt((inputs[0] as HTMLInputElement).max)) * 100;
        const percentRight: number = 100 - (maxVal / parseInt((inputs[1] as HTMLInputElement).max)) * 100;

        if (maxVal - minVal < priceGap) {
          if ((e.target as HTMLElement).className === 'range-filter__range-input-min') {
            (inputs[0] as HTMLInputElement).value = `${maxVal - priceGap}`;
          } else {
            (inputs[1] as HTMLInputElement).value = `${minVal + priceGap}`;
          }
        } else {
          (priceInputs[0] as HTMLInputElement).value = `${minVal}`;
          (priceInputs[1] as HTMLInputElement).value = `${maxVal}`;
          progress.style.left = `${percentLeft}%`;
          progress.style.right = `${percentRight}%`;
        }
      });
    });

    priceInputs.forEach((input) => {
      input.addEventListener('input', (e: Event) => {
        const minVal: number =
          parseInt((priceInputs[0] as HTMLInputElement).value as string) === 0
            ? 1
            : parseInt((priceInputs[0] as HTMLInputElement).value as string);
        const maxVal: number = parseInt((priceInputs[1] as HTMLInputElement).value as string);
        let percentLeft: number = Math.ceil((minVal / parseInt((inputs[0] as HTMLInputElement).max)) * 100);

        let percentRight: number = 100 - (maxVal / parseInt((inputs[1] as HTMLInputElement).max)) * 100;

        if (maxVal - minVal >= priceGap) {
          if ((e.target as HTMLElement) === checkMinInput) {
            if (minVal < 0) {
              percentLeft = 0;
            }
            (inputs[0] as HTMLInputElement).value = `${minVal}`;
            progress.style.left = `${percentLeft}%`;
          } else {
            if (maxVal > constMax) {
              percentRight = 0;
            }
            (inputs[1] as HTMLInputElement).value = `${maxVal}`;
            progress.style.right = `${percentRight}%`;
          }
        }
      });
    });
  }
}
