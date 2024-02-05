import request from "supertest";
import app from "../src/app";


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
  
  describe("POST /users", () => {
    describe("given user data", () => {
      const newUser = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      };
  
      // should respond with a 201 code
      test("should respond with a 201 status code", async () => {
        const response = await request(app).post("/users").send(newUser);
        expect(response.statusCode).toBe(201);
      });
  
      // should respond a json as a content type
      test("should have a Content-Type: application/json header", async () => {
        const response = await request(app).post("/users").send(newUser);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json")
        );
      });
  
      // shoud respond with a json object containing the new user with an id
      test("should respond with a user ID", async () => {
        const response = await request(app).post("/users").send(newUser);
        expect(response.body.id).toBeDefined();
      });
    });
  
    describe("when required user data is missing", () => {
      // should respond with a 400 code
      test("should respond with a 400 status code", async () => {
        const fields = [
          { username: "testuser", email: "testuser@example.com" },
          { username: "testuser", password: "password123" },
          { email: "testuser@example.com", password: "password123" },
        ];
  
        for (const body of fields) {
          const response = await request(app).post("/users").send(body);
          expect(response.statusCode).toBe(400);
        }
      });
    });
  });
  
  describe("GET /users/:id", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/users/1").send();
      expect(response.statusCode).toBe(200);
    });
  
    // Add more tests as needed for getting user by ID
  });
  
  describe("DELETE /users/:id", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).delete("/users/1").send();
      expect(response.statusCode).toBe(200);
    });
  
    // Add more tests as needed for deleting user by ID
  });
  