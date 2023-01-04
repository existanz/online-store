import './range-filter.scss';

import { RangeSliderInterFace, RangeSliderOptions } from '../../../../../shared/models/store-page';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../../shared/components/base-elements/input-element';

export class RangeFilter extends DOMElement {
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

  public rangeInputs: HTMLElement[];
  public textInputs: HTMLElement[];
  public checkMinInput: HTMLElement;
  private constMax: number;

  private priceGap: number;

  constructor(parentNode: HTMLElement, rangeOptions: RangeSliderOptions) {
    super(parentNode, {
      tagName: 'div',
      classList: ['range-filter'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['range-filter__title'],
      content: rangeOptions.title,
    });

    this.wrapper = new DOMElement(this.node, {
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
      min: `${rangeOptions.data.min}`,
      max: `${rangeOptions.data.max}`,
      value: `${rangeOptions.data.min}`,
    });

    this.rangeInputMax = new InputElement(this.rangeField.node, {
      tagName: 'input',
      classList: ['range-filter__range-input-max'],
      type: 'range',
      min: `${rangeOptions.data.min}`,
      max: `${rangeOptions.data.max}`,
      value: `${rangeOptions.data.max}`,
    });

    this.inputField = new DOMElement(this.wrapper.node, {
      tagName: 'div',
      classList: ['range-filter__input-container'],
    });

    this.inputMin = new InputElement(this.inputField.node, {
      tagName: 'input',
      type: 'number',
      classList: ['range-filter__input'],
      value: `${rangeOptions.data.min}`,
    });

    this.inputMax = new InputElement(this.inputField.node, {
      tagName: 'input',
      type: 'number',
      classList: ['range-filter__input'],
      value: `${rangeOptions.data.max}`,
    });

    this.rangeInputs = [this.rangeInputMin.node, this.rangeInputMax.node];
    this.textInputs = [this.inputMin.node, this.inputMax.node];
    this.checkMinInput = this.inputMin.node;
    this.constMax = parseInt((this.rangeInputs[0] as HTMLInputElement).max);

    this.priceGap = rangeOptions.title == 'Price' ? 100 : 10;
    this.changeRange(this.priceGap);
  }

  public changeRange(priceGap: number): void {
    this.rangeInputs.forEach((input) => {
      input.addEventListener('input', (e: Event) => {
        const minVal: number =
          parseInt((this.rangeInputs[0] as HTMLInputElement).value as string) -
          parseInt((this.rangeInputs[0] as HTMLInputElement).min as string);
        const maxVal: number = parseInt((this.rangeInputs[1] as HTMLInputElement).value as string);
        const percentLeft: number =
          (minVal /
            (parseInt((this.rangeInputs[0] as HTMLInputElement).max) -
              parseInt((this.rangeInputs[0] as HTMLInputElement).min as string))) *
          100;
        const min = parseInt((this.rangeInputs[0] as HTMLInputElement).min as string);
        const percentRight: number =
          100 -
          ((parseInt((this.rangeInputs[1] as HTMLInputElement).value) - min) /
            (parseInt((this.rangeInputs[1] as HTMLInputElement).max) - min)) *
            100;
        if (maxVal - minVal < priceGap) {
          if ((e.target as HTMLElement).className === 'range-filter__range-input-min') {
            (this.rangeInputs[0] as HTMLInputElement).value = `${maxVal - priceGap}`;
          } else {
            (this.rangeInputs[1] as HTMLInputElement).value = `${minVal + priceGap}`;
          }
        } else {
          (this.textInputs[0] as HTMLInputElement).value = `${
            minVal + parseInt((this.rangeInputs[0] as HTMLInputElement).min as string)
          }`;
          (this.textInputs[1] as HTMLInputElement).value = `${maxVal}`;
          this.progress.node.style.left = `${percentLeft}%`;
          this.progress.node.style.right = `${percentRight}%`;
        }
      });
    });

    this.textInputs.forEach((input) => {
      input.addEventListener('input', (e: Event) => {
        const minVal: number = parseInt((this.textInputs[0] as HTMLInputElement).value as string);
        const maxVal: number = parseInt((this.textInputs[1] as HTMLInputElement).value as string);
        let percentLeft: number = Math.ceil((minVal / parseInt((this.rangeInputs[0] as HTMLInputElement).max)) * 100);

        let percentRight: number = 100 - (maxVal / parseInt((this.rangeInputs[1] as HTMLInputElement).max)) * 100;

        if (maxVal - minVal >= priceGap) {
          if ((e.target as HTMLElement) === this.checkMinInput) {
            if (minVal < 0) {
              percentLeft = 0;
            }
            (this.rangeInputs[0] as HTMLInputElement).value = `${minVal}`;
            this.progress.node.style.left = `${percentLeft}%`;
          } else {
            if (maxVal > this.constMax) {
              percentRight = 0;
            }
            (this.rangeInputs[1] as HTMLInputElement).value = `${maxVal}`;
            this.progress.node.style.right = `${percentRight}%`;
          }
        }
      });
    });
  }

  public updateRange(data: RangeSliderInterFace) {
    this.rangeInputMin.node.setAttribute('min', `${data.min}`);
    this.rangeInputMin.node.setAttribute('max', `${data.max}`);

    this.rangeInputMax.node.setAttribute('min', `${data.min}`);
    this.rangeInputMax.node.setAttribute('max', `${data.max}`);

    this.inputMin.node.setAttribute('value', `${data.min}`);
    this.inputMax.node.setAttribute('value', `${data.max}`);

    this.progress.node.style.left = '0';
    this.progress.node.style.right = '0';

    this.rangeInputs = [this.rangeInputMin.node, this.rangeInputMax.node];
    this.textInputs = [this.inputMin.node, this.inputMax.node];
    this.checkMinInput = this.inputMin.node;
    this.constMax = data.max;

    this.rangeInputMax.node.setAttribute('value', `${data.max}`);
    this.rangeInputMin.node.setAttribute('value', `${data.min}`);
  }
}
