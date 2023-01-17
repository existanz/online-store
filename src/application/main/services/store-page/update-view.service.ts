import { RangeSliderInterFace } from '../../../shared/models/store-page';
import stateService from '../../../shared/services/state.service';
import checkboxFilterService from './filters/checkbox-filters.service';
import rangeFilterService from './filters/range-filters.service';

class UpdateData {
  public update() {
    stateService.current = stateService.allData;

    if (checkboxFilterService.checkedCategories.length) {
      stateService.current = stateService.current.filter((item) =>
        checkboxFilterService.checkedCategories.includes(item.category.split(' ').join('-').toLowerCase())
      );
    }

    if (checkboxFilterService.checkedBrands.length) {
      stateService.current = stateService.current.filter((item) =>
        checkboxFilterService.checkedBrands.includes(item.brand.split(' ').join('-').toLowerCase())
      );
    }

    return stateService.current;
  }

  public updatePrice() {
    stateService.current = stateService.current.filter((item) => {
      return (
        item.price >= (rangeFilterService.priceState as RangeSliderInterFace).min &&
        item.price <= (rangeFilterService.priceState as RangeSliderInterFace).max
      );
    });
    return stateService.current;
  }

  public updateStock() {
    stateService.current = stateService.current.filter((item) => {
      return (
        item.stock >= (rangeFilterService.stockState as RangeSliderInterFace).min &&
        item.stock <= (rangeFilterService.stockState as RangeSliderInterFace).max
      );
    });
    return stateService.current;
  }

  public updateProductCounter() {
    (document.querySelector('.total-products') as HTMLElement).innerText = `Products: ${stateService.current.length}`;
  }
}

const updateData = new UpdateData();
export default updateData;
