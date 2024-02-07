import request from 'supertest';
import app from '../app.js'; // Reemplaza '../tu/aplicacion' con la ruta de tu aplicación Express

describe('Pruebas para endpoints de usuarios', () => {
  test('GET /v1/users', async () => {
    const response = await request(app).get('/v1/users').timeout(10000); // Aumenta el tiempo de espera a 10 segundos (10000 ms)
  expect(response.statusCode).toBe(200);
    // Agrega más expectativas según sea necesario
  });

  // Prueba para crear un nuevo usuario
  test('POST /v1/users/signUp', async () => {
    const userData = {
      username: "Jorgiño32",
      email: "wills@example.com",
      password: "12345S#",
      registeredAt: "2024-02-05T12:00:00Z",
      role: "user"
    };

    const response = await request(app)
      .post('/v1/users/signUp')
      .send(userData)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    // Agrega más expectativas según sea necesario
  });

  // Prueba para iniciar sesión
  test('POST /v1/users/signIn', async () => {
    const userData = {
      email: "jorgi@example.com",
      password: "Password123!"
    };

    const response = await request(app)
      .post('/v1/users/signIn')
      .send(userData)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    // Agrega más expectativas según sea necesario
  });

  


});
