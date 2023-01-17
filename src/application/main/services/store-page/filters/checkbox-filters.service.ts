import { ProductsData } from '../../../../shared/models/response-data';
import { CheckboxInterface, ReduceValue } from '../../../../shared/models/store-page';

class CheckboxFilterService {
  public categoryState: CheckboxInterface[];
  public brandState: CheckboxInterface[];
  public checkedCategories: string[];
  public checkedBrands: string[];

  constructor() {
    this.categoryState = [];
    this.brandState = [];
    this.checkedCategories = [];
    this.checkedBrands = [];
  }

  public pickCategory(data: ProductsData[]) {
    this.categoryState = [];
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

  public pickBrand(data: ProductsData[]) {
    this.brandState = [];
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

  private formatText(text: string) {
    return text
      .split('-')
      .map((item, index) => (index === 0 ? item[0].toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase()))
      .join(' ');
  }

  private alphabetOrder(data: CheckboxInterface[]) {
    return data.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      return 1;
    });
  }

  public checkCheckboxValue(e: Event) {
    const target: HTMLElement = e.target as HTMLElement;
    let value: string;

    if (target.closest('.brand') && target.closest('.checkbox-filter__label')) {
      value = target.parentNode
        ?.querySelector('.checkbox-filter__category-name')
        ?.innerHTML.toLowerCase()
        .split(' ')
        .join('-') as string;

      if (this.checkedBrands.includes(value)) {
        this.removeCheckedElem(value, this.checkedBrands);
      } else {
        this.checkedBrands.push(value);
      }
    }

    if (target.closest('.category') && target.closest('.checkbox-filter__label')) {
      value = target.parentNode
        ?.querySelector('.checkbox-filter__category-name')
        ?.innerHTML.toLowerCase()
        .split(' ')
        .join('-') as string;

      if (this.checkedCategories.includes(value)) {
        this.removeCheckedElem(value, this.checkedCategories);
      } else {
        this.checkedCategories.push(value);
      }
    }
  }

  private removeCheckedElem(elem: string, arr: string[]) {
    const indexElem = arr.indexOf(elem);
    arr.splice(indexElem, 1);
  }

  public isChecked(title: string, name: string) {
    const state = title == 'Category' ? this.checkedCategories : this.checkedBrands;
    const value = name.split(' ').join('-').toLowerCase();
    return state.indexOf(value) > -1;
  }
}

const checkboxFilterService = new CheckboxFilterService();
export default checkboxFilterService;
