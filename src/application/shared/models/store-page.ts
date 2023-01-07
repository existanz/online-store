export interface CheckboxOptions {
  title: string;
  data: CheckboxInterface[];
}

export interface RangeSliderOptions {
  title: 'stock' | 'price';
  data: RangeSliderInterFace;
}

export interface CheckboxInterface {
  name: string;
  count: number;
  checked?: boolean;
}

export interface RangeSliderInterFace {
  min: number;
  max: number;
}

export interface ReduceValue {
  [key: string]: number;
}
