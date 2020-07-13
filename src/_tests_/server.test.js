import supertest from 'supertest';
import http from 'http';
import app from '../server/server';
import "regenerator-runtime/runtime.js";

describe('Post endpoint', () => {
  let server;
  let request;
  
  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('returns 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('/geoNameDataRoute', async (done) => {
    const response = await request.get('/geoNameDataRoute');
    expect(response.status).toBe(200);
    done();
  });

});


  