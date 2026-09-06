const request = require("supertest");

const app = require("../app");

const {
    connectTestDb,
    closeTestDb
} = require("./setup/db");

describe("Health check", () => {
    beforeAll(async () => {
        await connectTestDb();
    });

    afterAll(async () => {
        await closeTestDb();
    });

    it("should respond to GET /api/tasks", async () => {
        const response = await request(app)
            .get("/api/tasks");

        expect(response.status).toBe(200);
    });
});