const request = require("supertest");

const app = require("../app");

const {
    connectTestDb,
    clearTestDb,
    closeTestDb
} = require("./setup/db");

describe("Task API", () => {
    beforeAll(async () => {
        await connectTestDb();
    });

    afterAll(async () => {
        await closeTestDb();
    });

    beforeEach(async () => {
        await clearTestDb();
    });

       test("POST /api/tasks creates a task", async () => {
        const res = await request(app)
            .post("/api/tasks")
            .send({
                title: "Learn MongoDB",
                status: "todo",
                assignee: "user 1",
                priority: "high"
            });

        expect(res.status).toBe(201);

        expect(res.body).toEqual(
            expect.objectContaining({
                title: "Learn MongoDB",
                status: "todo",
                assignee: "user 1",
                priority: "high"
            })
        );

        expect(res.body._id).toBeDefined();
    });

    test("POST /api/tasks rejects an invalid task", async () => {
        const res = await request(app)
            .post("/api/tasks")
            .send({
                title: "Hi",
                status: "todo",
                priority: "high"
            });

        expect(res.status).toBe(400);
    });

    test("GET /api/tasks/:id returns a task", async () => {
    const created = await request(app)
        .post("/api/tasks")
        .send({
            title: "Task for GET by ID",
            status: "todo",
            assignee: "user 1",
            priority: "normal"
        });

    const taskId = created.body._id;

    const res = await request(app)
        .get(`/api/tasks/${taskId}`);

    expect(res.status).toBe(200);

    expect(res.body).toEqual(
        expect.objectContaining({
            _id: taskId,
            title: "Task for GET by ID",
            assignee: "user 1",
            priority: "normal"
        })
    );
    });
    test("GET /api/tasks/:id returns 404 for a missing task", async () => {
        const res = await request(app)
            .get("/api/tasks/507f1f77bcf86cd799439011");

        expect(res.status).toBe(404);
        expect(res.body).toEqual({
            message: "Task not found"
        });
    });

    test("GET /api/tasks/:id returns 404 for an invalid ID", async () => {
    const res = await request(app)
        .get("/api/tasks/invalid-id");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
        message: "Task not found"
    });
    });

    test("DELETE /api/tasks/:id deletes a task", async () => {
    const created = await request(app)
        .post("/api/tasks")
        .send({
            title: "Task to delete",
            status: "todo",
            assignee: "user 1",
            priority: "normal"
        });

    const taskId = created.body._id;

    const res = await request(app)
        .delete(`/api/tasks/${taskId}`);

    expect(res.status).toBe(200);

    expect(res.body).toEqual(
        expect.objectContaining({
            _id: taskId,
            title: "Task to delete"
        })
    );

    const check = await request(app)
        .get(`/api/tasks/${taskId}`);

    expect(check.status).toBe(404);
    });

    test("DELETE /api/tasks/:id returns 404 for a missing task", async () => {
    const res = await request(app)
        .delete("/api/tasks/507f1f77bcf86cd799439011");

    expect(res.status).toBe(404);

    expect(res.body).toEqual({
        message: "Task not found"
    });
    });

    test("DELETE /api/tasks/:id returns 404 for an invalid ID", async () => {
    const res = await request(app)
        .delete("/api/tasks/invalid-id");

    expect(res.status).toBe(404);

    expect(res.body).toEqual({
        message: "Task not found"
    });
});
});