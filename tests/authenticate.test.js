const jwt = require("jsonwebtoken");

const authenticate = require("../src/middleware/authenticate");

const config = require("../src/config");

describe("authenticate middleware", () => {
    test("rejects request when authorization header is missing", () => {
        const req = {
            headers: {}
        };

        const res = {};

        const next = jest.fn();

        authenticate(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);

        const error = next.mock.calls[0][0];

        expect(error.status).toBe(401);
        expect(error.code).toBe("NO_TOKEN");
        expect(error.message).toBe("Authentication required");
    });

    test("accepts a valid token and sets req.user", () => {
    const req = {
        headers: {
            authorization: `Bearer ${jwt.sign(
                {
                    sub: "1",
                    email: "user@nsbm.lk"
                },
                config.jwtSecret
            )}`
        }
    };

    const res = {};

    const next = jest.fn();

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith();

    expect(req.user).toEqual({
        id: "1",
        email: "user@nsbm.lk"
    });
    });

    test("rejects an invalid token", () => {
    const req = {
        headers: {
            authorization: "Bearer invalid-token"
        }
    };

    const res = {};

    const next = jest.fn();

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    const error = next.mock.calls[0][0];

    expect(error.status).toBe(401);
    expect(error.code).toBe("BAD_TOKEN");
    expect(error.message).toBe("Invalid token");
    });
});