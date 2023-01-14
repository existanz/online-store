import MOCK_RANGE_FILTER_SERVICE from "../main/services/store-page/filters/range-filters.service";
import MOCK_PRODUCTS from "./mock.products";
import { State } from "../shared/services/state.service";
import viewService from "../main/services/store-page/change-view.service";
import { GridView } from "../main/components/store-page/items/grid-view/grid-view";

describe('test Checkbox', () => {
  beforeAll(() => {
    State.current = MOCK_PRODUCTS;
    viewService.view = new GridView(null, State.current);
  });
  

  it('Метод должен забирать из данных наибольшую и наименьшую цену', () => {
    expect(MOCK_RANGE_FILTER_SERVICE.pickPrice(MOCK_PRODUCTS)).toEqual(
      {
        min: 280,
        max: 1749,
      }
    );
  });
  it('Метод должен забирать из данных наибольшее и наименьшее количество на складе', () => {
    expect(MOCK_RANGE_FILTER_SERVICE.pickPrice(MOCK_PRODUCTS)).toEqual(
      {
        min: 32,
        max: 123,
      }
    );
  });
});
