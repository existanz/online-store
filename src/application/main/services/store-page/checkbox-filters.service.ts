import { ProductsData } from '../../../shared/models/response-data';
import { CheckboxInterface, ReduceValue } from '../../../shared/models/store-page';

export abstract class CheckboxFilterService {
  static categoryState: CheckboxInterface[] = [];
  static brandState: CheckboxInterface[] = [];

  static pickCategory(data: ProductsData[]) {
    const params = data.reduce((value: ReduceValue, key) => {
      key.category = this.formatText(key.category);
      value[key.category] = (value[key.category] || 0) + 1;
      return value;
    }, {});

    for (const key in params) {
      this.categoryState.push({
        name: key,
        count: params[key],
      });
    }

    return this.categoryState;
  }

  static formatText(text: string) {
    return text
      .split('-')
      .map((item, index) => (index === 0 ? item[0].toUpperCase() + item.slice(1) : item))
      .join(' ');
  }

  static pickBrand(data: ProductsData[]) {
    const params = data.reduce((value: ReduceValue, key) => {
      key.brand = this.formatText(key.brand);
      value[key.brand] = (value[key.brand] || 0) + 1;
      return value;
    }, {});

    for (const key in params) {
      this.brandState.push({
        name: key,
        count: params[key],
      });
    }

    return this.brandState;
  }
}
