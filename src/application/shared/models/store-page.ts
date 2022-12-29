export interface StorePageOptions {
  title: string;
  data: CheckboxInterface[];
}

export interface CheckboxInterface {
  name: string;
  count: number;
}

export interface ReduceValue {
  [key: string]: number;
}
