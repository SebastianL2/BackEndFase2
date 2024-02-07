import request from 'supertest';
import app from '../app.js'; 
describe('Pruebas para los endpoints de videos', () => {
  let authToken;

  beforeAll(async () => {
   
    const signInResponse = await request(app)
      .post('/v1/users/signIn')
      .send({ email: 'wills@example.com', password: '12345S#' })
      .set('Content-Type', 'application/json');
    authToken = signInResponse.body.token;
  });

  test('Obtener videos privados con token de autenticación', async () => {
    const response = await request(app)
      .get('/v1/videos/privates')
      .set('x-access-token', authToken)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
   
  });

  test('Obtener videos públicos sin autenticación', async () => {
    const response = await request(app)
      .get('/v1/videos/publics')
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
   
  });

  test('Obtener todos los videos con token de autenticación', async () => {
    const response = await request(app)
      .get('/v1/videos')
      .set('x-access-token', authToken)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
   
  });

});
