import request from 'supertest';
import { UserModel } from "../modelsDB/MongoDb/users.js";

import { createApp } from "../app.js";

const app = createApp({ userModel: UserModel });

describe('Pruebas para endpoints de usuarios', () => {
  test('GET /v1/users', async () => {
    const response = await request(app).get('/v1/users').timeout(10000); 
  expect(response.statusCode).toBe(200);
  
  });

  
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

    expect(response.statusCode).toBe(201);
   
  });

 
  test('POST /v1/users/signIn', async () => {
    const userData = {
      email: "wills@example.com",
      password: "12345S#"
    };

    const response = await request(app)
      .post('/v1/users/signIn')
      .send(userData)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    
  });

  


});
