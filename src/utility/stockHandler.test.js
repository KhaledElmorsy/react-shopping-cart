import { changeStock, checkStockChange } from './stockHandler';
import controller from '../model/controller';

jest.mock('../model/controller');
describe('checkStockChange()', () => {
  it('returns an object with an truthy "err" property if the item ID isn\'t found', () => {
    (async () => {
      controller.getFiltered.mockImplementation(async () => []);
      let result = await checkStockChange({});
      expect(!!result.err).toBe(true);
    })();
  });

  it('return an object with the ID and new calculated stock', () => {
    (async () => {
      let id = 0;
      let stock = 5;
      let increment = 2;
      controller.getFiltered.mockImplementation(async () => [{ id, stock }]);
      let result = await checkStockChange({ id, increment });
      expect(result.newStock).toBe(stock + increment);
      expect(result.id).toBe(id);
    })();
  });

  it('return an object with a truthy "err" if the new stock is less than 0', () => {
    (async () => {
      let id = 0;
      let stock = 2;
      let increment = -3;
      controller.getFiltered.mockImplementation(async () => [{ id, stock }]);
      let result = await checkStockChange({ id, increment });
      expect(!!result.err).toBe(true);
    })();
  });
});

describe('changeStock()', () => {
  describe('Upon getting a valid ID: ', () => {
    beforeAll(() => {
      controller.setField.mockImplementation(async () => {});
    });
    it("calls the controller's setField(), and returns true", () => {
      (async () => {
        let result = await changeStock({ id: 0, newStock: 0 });
        expect(result).toBe(true);
        expect(controller.setField.mock.calls.length).toBe(1);
      })();
    });
  });
  it('Returns false when passed an invalid ID', () => {
    (async () => {
      controller.setField.mockImplementation(async() => {throw new Error()})
      let result = await changeStock({});
      expect(result).toBe(false);
    })();
  })
});
