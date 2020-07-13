import { postcountryData } from '../client/js/formHandler'
import "regenerator-runtime/runtime.js";


describe('Test "postcountryData()" should exist' , () => {
  test('It should return true', async () => {
    expect(postcountryData).toBeDefined();
  });
});

