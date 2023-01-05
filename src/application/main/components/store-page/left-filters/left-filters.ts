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
import { GridView } from '../items/grid-view/grid-view';
import { ListView } from '../items/list-view/list-view';

export class LeftFilters extends DOMElement {
  public totalProducts: DOMElement;
  public checkboxCategory: CheckboxFilter;
  public checkboxBrand: CheckboxFilter;
  public rangePrice: RangeFilter;
  public rangeStock: RangeFilter;
  public whiteButton: WhiteButton;
  private view: GridView | ListView | null;

  constructor(parentNode: HTMLElement, data: ProductsData[], render: GridView | ListView | null) {
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
      title: 'Price',
      data: RangeFilterService.pickPrice(data),
    });

    this.rangeStock = new RangeFilter(this.node, {
      title: 'Stock',
      data: RangeFilterService.pickStock(data),
    });

    this.whiteButton = new WhiteButton(this.node, {
      tagName: 'button',
      id: 'copy-query',
      content: 'Copy',
    });

    this.whiteButton = new BlueButton(this.node, {
      tagName: 'button',
      id: 'reset-filters',
      content: 'Reset',
    });
    this.listen();
    this.view = render;
  }

  public listen() {
    this.checkboxCategory.list.node.addEventListener('click', (e: Event) => {
      CheckboxFilterService.checkCheckboxValue(e);
      const newState = UpdateData.update();
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

      (this.view as GridView).render(newState);
      this.updateRange(newState);
      UpdateData.updateProductCounter();
    });

    this.checkboxBrand.list.node.addEventListener('click', (e: Event) => {
      CheckboxFilterService.checkCheckboxValue(e);
      const newState = UpdateData.update();
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

      (this.view as GridView).render(newState);
      this.updateRange(newState);
      UpdateData.updateProductCounter();
    });

    this.rangePrice.node.addEventListener('input', (e: Event) => {
      RangeFilterService.pickData(e, 'price');
      const newState = UpdateData.update('price');
      (this.view as GridView).render(newState);
      UpdateData.updateProductCounter();
    });

    this.rangeStock.node.addEventListener('input', (e: Event) => {
      RangeFilterService.pickData(e, 'stock');
      const newState = UpdateData.update('stock');
      (this.view as GridView).render(newState);
      UpdateData.updateProductCounter();
    });
  }

  private updateRange(newState: ProductsData[]) {
    const priceState = RangeFilterService.pickPrice(newState);
    this.rangePrice.updateRange(priceState);

    const stockState = RangeFilterService.pickStock(newState);
    this.rangeStock.updateRange(stockState);
  }
}
