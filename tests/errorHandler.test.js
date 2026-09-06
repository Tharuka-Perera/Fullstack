const {
    notFoundHandler,
    errorHandler
} = require("../src/middleware/errorHandler");

describe("errorHandler middleware", () => {
    test("notFoundHandler passes a 404 error to next", () => {
        const req = {};
        const res = {};
        const next = jest.fn();

        notFoundHandler(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);

        const error = next.mock.calls[0][0];

        expect(error.status).toBe(404);
        expect(error.message).toBe("Route not found");
    });

    test("errorHandler returns the error status and message", () => {
        const req = {
            id: "test-request-id"
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error("Task not found");
        error.status = 404;

        errorHandler(error, req, res, jest.fn());

        expect(res.status).toHaveBeenCalledWith(404);

        expect(res.json).toHaveBeenCalledWith({
            message: "Task not found",
            requestId: "test-request-id"
        });
    });

    test("errorHandler returns a generic message for server errors", () => {
        const req = {
            id: "test-request-id"
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const error = new Error("Database connection failed");
        error.status = 500;

        const consoleError = jest
            .spyOn(console, "error")
            .mockImplementation(() => {});

        errorHandler(error, req, res, jest.fn());

        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.json).toHaveBeenCalledWith({
            message: "Something went wrong",
            requestId: "test-request-id"
        });

        expect(consoleError).toHaveBeenCalledWith(error);

        consoleError.mockRestore();
    });
});