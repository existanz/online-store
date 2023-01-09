import './left-filters.scss';
import { DOMElement } from '../../../../shared/components/base-elements/dom-element';
import { CheckboxFilter } from './checkbox-filters/checkbox-filter';
import { RangeFilter } from './range-filters/range-filter';
import { WhiteButton } from '../../../../shared/components/buttons/white-button';
import { BlueButton } from '../../../../shared/components/buttons/blue-button';
import { ProductsData } from '../../../../shared/models/response-data';
import { CheckboxFilterService } from '../../../services/store-page/filters/checkbox-filters.service';
import { RangeFilterService } from '../../../services/store-page/filters/range-filters.service';
import { UpdateData } from '../../../services/store-page/update-view.service';
import { State } from '../../../../shared/services/state.service';
import { SearchService } from '../../../services/store-page/filters/search.service';
import { ResetService } from '../../../services/store-page/filters/reset.service';
import { CopyService } from '../../../services/store-page/filters/copy.service';
import { ViewService } from '../../../services/store-page/change-view.service';
import { Querry } from '../../../../shared/services/querry.service';

export class LeftFilters extends DOMElement {
  public totalProducts: DOMElement;
  public checkboxCategory: CheckboxFilter;
  public checkboxBrand: CheckboxFilter;
  public rangePrice: RangeFilter;
  public rangeStock: RangeFilter;
  public copyButton: WhiteButton;
  public resetButton: BlueButton;

  constructor(parentNode: HTMLElement, data: ProductsData[]) {
    super(parentNode, {
      tagName: 'aside',
      classList: ['left-filters'],
    });

    this.totalProducts = new DOMElement(this.node, {
      tagName: 'div',
      classList: ['total-products'],
      content: `Products: ${State.current.length}`,
    });

    this.checkboxCategory = new CheckboxFilter(this.node, {
      title: 'Category',
      data: CheckboxFilterService.pickCategory(data),
    });

    this.checkboxBrand = new CheckboxFilter(this.node, {
      title: 'Brand',
      data: CheckboxFilterService.pickBrand(data),
    });

    this.rangePrice = new RangeFilter(this.node, {
      title: 'price',
      data: RangeFilterService.priceState,
    });

    this.rangeStock = new RangeFilter(this.node, {
      title: 'stock',
      data: RangeFilterService.stockState,
    });

    this.copyButton = new WhiteButton(this.node, {
      tagName: 'button',
      id: 'copy-query',
      content: 'Copy',
    });

    this.resetButton = new BlueButton(this.node, {
      tagName: 'button',
      id: 'reset-filters',
      content: 'Reset',
    });
    this.listen();
  }

  public listen() {
    this.checkboxCategory.list.node.addEventListener('click', (e: Event) => {
      CheckboxFilterService.checkCheckboxValue(e);
      RangeFilterService.pickData(e, 'price');
      RangeFilterService.pickData(e, 'stock');
      let newState = UpdateData.updateStock();
      newState = UpdateData.updatePrice();
      newState = UpdateData.update();
      if (SearchService.searchState) {
        newState = SearchService.search(SearchService.searchState);
      }
      const brandData = {
        title: 'Brand',
        data: CheckboxFilterService.pickBrand(newState),
      };

      this.checkboxBrand.render(brandData);

      if (!CheckboxFilterService.checkedCategories.length) {
        const categoryData = {
          title: 'Category',
          data: CheckboxFilterService.pickCategory(newState),
        };
        this.checkboxCategory.render(categoryData);
      }

      ViewService.view.render(newState);
      UpdateData.updateProductCounter();
      this.updateMinMaxPrice();
      this.updateMinMaxStock();

      Querry.updateQuerry();
    });

    this.checkboxBrand.list.node.addEventListener('click', (e: Event) => {
      CheckboxFilterService.checkCheckboxValue(e);
      RangeFilterService.pickData(e, 'price');
      RangeFilterService.pickData(e, 'stock');
      let newState = UpdateData.updateStock();
      newState = UpdateData.updatePrice();
      newState = UpdateData.update();
      if (SearchService.searchState) {
        newState = SearchService.search(SearchService.searchState);
      }
      const categoryData = {
        title: 'Category',
        data: CheckboxFilterService.pickCategory(newState),
      };

      this.checkboxCategory.render(categoryData);

      if (!CheckboxFilterService.checkedBrands.length) {
        const brandData = {
          title: 'Brand',
          data: CheckboxFilterService.pickBrand(newState),
        };
        this.checkboxBrand.render(brandData);
      }

      ViewService.view.render(newState);
      UpdateData.updateProductCounter();

      this.updateMinMaxPrice();
      this.updateMinMaxStock();

      Querry.updateQuerry();
    });

    this.rangePrice.node.addEventListener('input', (e: Event) => {
      RangeFilterService.pickData(e, 'price');
      let newState = UpdateData.update();
      newState = UpdateData.updatePrice();
      if (SearchService.searchState) {
        newState = SearchService.search(SearchService.searchState);
      }
      ViewService.view.render(newState);
      UpdateData.updateProductCounter();

      const brandData = {
        title: 'Brand',
        data: CheckboxFilterService.pickBrand(newState),
      };
      this.checkboxBrand.render(brandData);

      const categoryData = {
        title: 'Category',
        data: CheckboxFilterService.pickCategory(newState),
      };
      this.checkboxCategory.render(categoryData);

      this.updateMinMaxStock();
    });

    this.rangePrice.node.addEventListener('change', Querry.updateQuerry);
    this.rangeStock.node.addEventListener('change', Querry.updateQuerry);

    this.rangeStock.node.addEventListener('input', (e: Event) => {
      RangeFilterService.pickData(e, 'stock');
      let newState = UpdateData.update();
      newState = UpdateData.updateStock();
      if (SearchService.searchState) {
        newState = SearchService.search(SearchService.searchState);
      }
      ViewService.view.render(newState);
      UpdateData.updateProductCounter();

      const brandData = {
        title: 'Brand',
        data: CheckboxFilterService.pickBrand(newState),
      };
      this.checkboxBrand.render(brandData);

      const categoryData = {
        title: 'Category',
        data: CheckboxFilterService.pickCategory(newState),
      };
      this.checkboxCategory.render(categoryData);

      this.updateMinMaxPrice();
    });

    this.resetButton.node.addEventListener('click', () => {
      let newState = ResetService.reset();
      RangeFilterService.priceState = RangeFilterService.pickPrice(newState);
      RangeFilterService.stockState = RangeFilterService.pickStock(newState);
      newState = UpdateData.updateStock();
      newState = UpdateData.updatePrice();
      newState = UpdateData.update();
      const brandData = {
        title: 'Brand',
        data: CheckboxFilterService.pickBrand(newState),
      };
      this.checkboxBrand.render(brandData);

      const categoryData = {
        title: 'Category',
        data: CheckboxFilterService.pickCategory(newState),
      };
      this.checkboxCategory.render(categoryData);
      UpdateData.updateProductCounter();

      this.updateMinMaxPrice();
      this.updateMinMaxStock();
      window.location.href = '#store';
    });

    this.copyButton.node.addEventListener('click', () => {
      CopyService.copy(this.copyButton.node as HTMLButtonElement);
    });
  }

  public updateMinMaxPrice() {
    RangeFilterService.priceState = RangeFilterService.pickPrice(State.current);
    (this.rangePrice.rangeInputMin.node as HTMLInputElement).value = RangeFilterService.priceState.min.toString();
    (this.rangePrice.rangeInputMax.node as HTMLInputElement).value = RangeFilterService.priceState.max.toString();

    (this.rangePrice.inputMin.node as HTMLInputElement).value = RangeFilterService.priceState.min.toString();
    (this.rangePrice.inputMax.node as HTMLInputElement).value = RangeFilterService.priceState.max.toString();
  }

  public updateMinMaxStock() {
    RangeFilterService.stockState = RangeFilterService.pickStock(State.current);
    (this.rangeStock.rangeInputMin.node as HTMLInputElement).value = RangeFilterService.stockState.min.toString();
    (this.rangeStock.rangeInputMax.node as HTMLInputElement).value = RangeFilterService.stockState.max.toString();

    (this.rangeStock.inputMin.node as HTMLInputElement).value = RangeFilterService.stockState.min.toString();
    (this.rangeStock.inputMax.node as HTMLInputElement).value = RangeFilterService.stockState.max.toString();
  }
}
