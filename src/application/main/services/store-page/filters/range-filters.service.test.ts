// import { ProductsData } from "../../../../shared/models/response-data";
import MOCK_PRODUCTS from '../../../../../../__mocks__/mock.products';
import { mockRangeFilterService } from './range-filters.service';

// const mockPickPrice = jest.fn((data: ProductsData[]) => {
//   return {
//     max: data.reduce((x, y) => Math.max(x, y.price), 0),
//     min: data.reduce(
//       (x, y) => Math.min(x, y.price),
//       data.reduce((x, y) => Math.max(x, y.price), 0)
//     ),
//   }
// })

// const mockPrickStock = jest.fn((data: ProductsData[]) => {
//   return {
//     max: data.reduce((x, y) => Math.max(x, y.stock), 0),
//     min: data.reduce(
//       (x, y) => Math.min(x, y.stock),
//       data.reduce((x, y) => Math.max(x, y.stock), 0)
//     ),
//   }
// })

describe('test Range-filter service', () => {
  it('Метод должен забирать из данных наибольшую и наименьшую цену', () => {
    mockRangeFilterService.pickPrice(MOCK_PRODUCTS);

    const MOCK_RESULT = {
      min: 280,
      max: 1749,
    };

    expect(mockRangeFilterService.priceState).toEqual(MOCK_RESULT);
  });

  // it('Метод должен забирать из данных наибольшее и наименьшее количество на складе', () => {
  //   expect(mockPrickStock(MOCK_PRODUCTS)).toEqual(
  //     {
  //       min: 32,
  //       max: 123,
  //     }
  //   );
  // });
});
