const {
    hashPassword,
    comparePassword
} = require("../src/utils/password");

describe("password utilities", () => {
    test("hashPassword creates a password hash", async () => {
        const password = "password123";

        const hash = await hashPassword(password);

        expect(hash).toBeDefined();
        expect(hash).not.toBe(password);
        expect(hash.startsWith("$2")).toBe(true);
    });

    test("comparePassword returns true for the correct password", async () => {
        const password = "password123";

        const hash = await hashPassword(password);

        const result = await comparePassword(password, hash);

        expect(result).toBe(true);
    });

    test("comparePassword returns false for the wrong password", async () => {
        const password = "password123";

        const hash = await hashPassword(password);

        const result = await comparePassword(
            "wrong-password",
            hash
        );

        expect(result).toBe(false);
    });
});