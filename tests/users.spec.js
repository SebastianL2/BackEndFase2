import request from "supertest";
import app from "../app";
// set NODE_OPTIONS=--experimental-vm-modules npx jest

describe("GET /users", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/users").send();
      expect(response.statusCode).toBe(200);
    });
  
    test("should respond an array", async () => {
      const response = await request(app).get("/users").send();
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  
