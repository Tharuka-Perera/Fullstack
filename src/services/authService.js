const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("../config");
const { userRepo, publicUser } = require("../repos/userRepo");

async function login(email, password) {
    const user = await userRepo.findByEmail(email);

    if (!user) {
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    const ok = await bcrypt.compare(password, user.passwordHash);

    if (!ok) {
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            sub: user.id,
            email: user.email
        },
        config.jwtSecret,
        {
            expiresIn: "1h"
        }
    );

    return {
        token,
        user: publicUser(user)
    };
}

module.exports = {
    login
};