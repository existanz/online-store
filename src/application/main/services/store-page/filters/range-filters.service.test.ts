import MOCK_PRODUCTS from '../../../../../../__mocks__/mock.products';
import { RangeFilterService } from './range-filters.service';

const service = new RangeFilterService();

describe('test Range-filter service', () => {
  it('Метод должен забирать из данных наибольшую и наименьшую цену', () => {

    service.pickPrice(MOCK_PRODUCTS);

    const MOCK_RESULT = {
      min: 280,
      max: 1749,
    };

    expect(service.priceState).toEqual(MOCK_RESULT);
  });

  it('Метод должен забирать из данных наибольшее и наименьшее количество на складе', () => {

    service.pickStock(MOCK_PRODUCTS);

    const MOCK_RESULT = {
      min: 32,
      max: 123,
    };

    expect(service.stockState).toEqual(MOCK_RESULT);
  });
});
