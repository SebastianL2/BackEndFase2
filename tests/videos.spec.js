import request from "supertest";
import app from "../src/app";

describe("GET /videos", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/videos").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond an array", async () => {
    const response = await request(app).get("/videos").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /videos", () => {
  describe("given a title and description", () => {
    const newVideo = {
      title: "some title",
      description: "some description",
    };

    // should respond with a 201 code
    test("should respond with a 201 status code", async () => {
      const response = await request(app).post("/videos").send(newVideo);
      expect(response.statusCode).toBe(201);
    });

    // should respond a json as a content type
    test("should have a Content-Type: application/json header", async () => {
      const response = await request(app).post("/videos").send(newVideo);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // shoud respond with a json object containing the new video with an id
    test("should respond with a video ID", async () => {
      const response = await request(app).post("/videos").send(newVideo);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("when the title and description is missing", () => {
    // should respond with a 400 code
    test("should respond with a 400 status code", async () => {
      const fields = [
        { title: "some title" },
        { description: "some description" },
      ];

      for (const body of fields) {
        const response = await request(app).post("/videos").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
