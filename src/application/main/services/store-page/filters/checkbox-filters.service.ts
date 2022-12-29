import { ProductsData } from '../../../../shared/models/response-data';
import { CheckboxInterface, ReduceValue } from '../../../../shared/models/store-page';

export abstract class CheckboxFilterService {
  static categoryState: CheckboxInterface[] = [];
  static brandState: CheckboxInterface[] = [];

  static pickCategory(data: ProductsData[]) {
    data.forEach((item) => item.category.toLowerCase());
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

    return this.alphabetOrder(this.categoryState);
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

    return this.alphabetOrder(this.brandState);
  }

  private static formatText(text: string) {
    return text
      .split('-')
      .map((item, index) => (index === 0 ? item[0].toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase()))
      .join(' ');
  }

  private static alphabetOrder(data: CheckboxInterface[]) {
    return data.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      return 1;
    });
  }
}
