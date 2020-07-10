const app = require('../../src/server/server');
const supertest = require('supertest');
const request = supertest(app);
import "regenerator-runtime/runtime.js";

describe('Post endpoint', () => {
  it('/geoNameDataRoute', async (done) => {
    const response = await request.get('/geoNameDataRoute');
    expect(response.status).toBe(200);
    done();
  });
});