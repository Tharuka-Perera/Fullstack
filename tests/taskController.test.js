const {
    list,
    get,
    create,
    remove
} = require("../src/controllers/taskController");

const { taskRepo } = require("../src/repos/taskRepo");

describe("taskController", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("list passes repository errors to next", async () => {
        const error = new Error("Database error");

        jest.spyOn(taskRepo, "findAll")
            .mockRejectedValueOnce(error);

        const req = {};
        const res = {
            json: jest.fn()
        };
        const next = jest.fn();

        await list(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.json).not.toHaveBeenCalled();
    });

    test("get passes repository errors to next", async () => {
        const error = new Error("Database error");

        jest.spyOn(taskRepo, "findById")
            .mockRejectedValueOnce(error);

        const req = {
            params: {
                id: "507f1f77bcf86cd799439011"
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        await get(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    test("create passes repository errors to next", async () => {
        const error = new Error("Database error");

        jest.spyOn(taskRepo, "create")
            .mockRejectedValueOnce(error);

        const req = {
            body: {
                title: "Test task",
                status: "todo",
                assignee: "user 1",
                priority: "normal"
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        await create(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    test("remove passes repository errors to next", async () => {
        const error = new Error("Database error");

        jest.spyOn(taskRepo, "deleteById")
            .mockRejectedValueOnce(error);

        const req = {
            params: {
                id: "507f1f77bcf86cd799439011"
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        await remove(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});