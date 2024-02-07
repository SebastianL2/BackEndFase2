import request from "supertest";
import { userRouter } from "../apiServices/users/route.js";
// set NODE_OPTIONS=--experimental-vm-modules npx jest

describe('GET /v1/users', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(userRouter).get('/v1/users');
    expect(response.statusCode).toBe(200);
  });

});
