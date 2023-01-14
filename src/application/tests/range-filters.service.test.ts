import { RangeFilterService } from "../main/services/store-page/filters/range-filters.service";
import MOCK_PRODUCTS from "./mock.products";

const rangeFilterService = new RangeFilterService();

describe('test Checkbox', () => {
  it('Метод должен забирать из данных наибольшую и наименьшую цену', () => {
    expect(rangeFilterService.pickPrice(MOCK_PRODUCTS)).toBe(
      {
        min: 280,
        max: 1749,
      }
    );
  });
  it('Метод должен забирать из данных наибольшее и наименьшее количество на складе', () => {
    expect(rangeFilterService.pickStock(MOCK_PRODUCTS)).toBe(
      {
        min: 32,
        max: 123,
      }
    );
  });
});
