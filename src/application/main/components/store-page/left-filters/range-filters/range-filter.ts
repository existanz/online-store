import './range-filter.scss';

import { RangeSliderOptions } from '../../../../../shared/models/store-page';
import { DOMElement } from '../../../../../shared/components/base-elements/dom-element';
import { InputElement } from '../../../../../shared/components/base-elements/input-element';
import { State } from '../../../../../shared/services/state.service';

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

  public rangeInputs: HTMLInputElement[];
  public textInputs: HTMLInputElement[];
  public checkMinInput: HTMLElement;
  private constMax: number;

  private value: 'stock' | 'price';

  private priceGap: number;

  constructor(parentNode: HTMLElement, rangeOptions: RangeSliderOptions) {
    super(parentNode, {
      tagName: 'div',
      classList: ['range-filter'],
    });

    this.title = new DOMElement(this.node, {
      tagName: 'span',
      classList: ['range-filter__title'],
      content: rangeOptions.title[0].toUpperCase() + rangeOptions.title.slice(1),
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

    this.value = rangeOptions.title;

    this.rangeInputMin = new InputElement(this.rangeField.node, {
      tagName: 'input',
      classList: ['range-filter__range-input-min'],
      type: 'range',
      min: this.pickMinMax().min.toString(),
      max: this.pickMinMax().max.toString(),
      value: `${rangeOptions.data.min}`,
    });

    this.rangeInputMax = new InputElement(this.rangeField.node, {
      tagName: 'input',
      classList: ['range-filter__range-input-max'],
      type: 'range',
      min: this.pickMinMax().min.toString(),
      max: this.pickMinMax().max.toString(),
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
      readonly: true,
    });

    this.inputMax = new InputElement(this.inputField.node, {
      tagName: 'input',
      type: 'number',
      classList: ['range-filter__input'],
      value: `${rangeOptions.data.max}`,
      readonly: true,
    });

    this.rangeInputs = [this.rangeInputMin.node as HTMLInputElement, this.rangeInputMax.node as HTMLInputElement];
    this.textInputs = [this.inputMin.node as HTMLInputElement, this.inputMax.node as HTMLInputElement];
    this.checkMinInput = this.inputMin.node;
    this.constMax = parseInt((this.rangeInputs[0] as HTMLInputElement).max);

    this.priceGap = 1;
    this.changeRange(this.priceGap);
  }

  public changeRange(priceGap: number): void {
    this.rangeInputs.forEach((input) => {
      input.addEventListener('input', (e: Event) => {
        const [rangeInputLeft, rangeInputRigth] = this.rangeInputs;
        const [textInputLeft, textInputRigth] = this.textInputs;

        const minVal: number = parseInt(rangeInputLeft.value as string) - parseInt(rangeInputLeft.min as string);
        const maxVal: number = parseInt(rangeInputRigth.value as string);
        const percentLeft: number =
          (minVal / (parseInt(rangeInputLeft.max) - parseInt(rangeInputLeft.min as string))) * 100;

        const min = parseInt(rangeInputLeft.min as string);
        const percentRight: number =
          100 - ((parseInt(rangeInputRigth.value) - min) / (parseInt(rangeInputRigth.max) - min)) * 100;

        if (maxVal - minVal < priceGap) {
          if ((e.target as HTMLElement).className === 'range-filter__range-input-min') {
            rangeInputLeft.value = `${maxVal - priceGap}`;
          } else {
            rangeInputRigth.value = `${minVal + priceGap}`;
          }
        } else {
          textInputLeft.value = `${minVal + parseInt(rangeInputLeft.min as string)}`;
          textInputRigth.value = `${maxVal}`;

          this.progress.node.style.left = `${percentLeft}%`;
          this.progress.node.style.right = `${percentRight}%`;
        }
      });
    });

    this.textInputs.forEach((input) => {
      input.addEventListener('input', (e: Event) => {
        const [rangeInputLeft, rangeInputRigth] = this.rangeInputs;
        const [textInputLeft, textInputRigth] = this.textInputs;

        const minVal: number = parseInt(textInputLeft.value);
        const maxVal: number = parseInt(textInputRigth.value);

        let percentLeft: number = Math.ceil((minVal / parseInt(rangeInputLeft.max)) * 100);
        let percentRight: number = 100 - (maxVal / parseInt(rangeInputRigth.max)) * 100;

        if (maxVal - minVal >= priceGap) {
          if ((e.target as HTMLElement) === this.checkMinInput) {
            if (minVal < 0) {
              percentLeft = 0;
            }
            rangeInputLeft.value = `${minVal}`;
            this.progress.node.style.left = `${percentLeft}%`;
          } else {
            if (maxVal > this.constMax) {
              percentRight = 0;
            }
            rangeInputRigth.value = `${maxVal}`;
            this.progress.node.style.right = `${percentRight}%`;
          }
        }
      });
    });
  }

  private pickMinMax() {
    const data = State.allData;
    return {
      max: data.reduce((x, y) => Math.max(x, y[this.value]), 0),
      min: data.reduce(
        (x, y) => Math.min(x, y[this.value]),
        data.reduce((x, y) => Math.max(x, y[this.value]), 0)
      ),
    };
  }
}
