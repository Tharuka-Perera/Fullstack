const jwt = require("jsonwebtoken");

const { login } = require("../src/services/authService");

const { userRepo } = require("../src/repos/userRepo");

const config = require("../src/config");

describe("authService", () => {
    test("rejects login when email does not exist", async () => {
        await expect(
            login("unknown@nsbm.lk", "password123")
        ).rejects.toMatchObject({
            status: 401,
            message: "Invalid email or password"
        });
    });

    test("rejects login when password is incorrect", async () => {
        jest.spyOn(userRepo, "findByEmail").mockResolvedValueOnce({
            id: "1",
            email: "user@nsbm.lk",
            passwordHash: "$2b$10$YnguWspgUy70vjno6X0vdeuZAZgXu4LfJ3Molk3zmIR62jVEqqy4C"
        });

        await expect(
            login("user@nsbm.lk", "wrong-password")
        ).rejects.toMatchObject({
            status: 401,
            message: "Invalid email or password"
        });

        jest.restoreAllMocks();
    });
    
    test("logs in successfully with correct credentials", async () => {
    jest.spyOn(userRepo, "findByEmail").mockResolvedValueOnce({
        id: "1",
        email: "user@nsbm.lk",
        passwordHash: "$2b$10$YnguWspgUy70vjno6X0vdeuZAZgXu4LfJ3Molk3zmIR62jVEqqy4C"
    });

    const result = await login(
        "user@nsbm.lk",
        "password"
    );

    expect(result.user).toEqual({
        id: "1",
        email: "user@nsbm.lk"
    });

    expect(result.token).toBeDefined();

    const payload = jwt.verify(
        result.token,
        config.jwtSecret
    );

    expect(payload.sub).toBe("1");
    expect(payload.email).toBe("user@nsbm.lk");

    jest.restoreAllMocks();
});
});