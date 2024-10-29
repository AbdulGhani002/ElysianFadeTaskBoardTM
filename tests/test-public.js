const request = require('supertest');
const app = require('../app');

describe('Public Assets', () => {
  it('should serve the main CSS file', async () => {
    const res = await request(app).get('/css/styles.css');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('text/css; charset=UTF-8');
  });

  it('should serve the main JS file', async () => {
    const res = await request(app).get('/js/main.js');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('application/javascript; charset=UTF-8');
  });

  it('should serve images', async () => {
    const res = await request(app).get('/images/logo.png');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('image/png');
  });
});
