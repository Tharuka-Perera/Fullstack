const jwt = require("jsonwebtoken");
const config = require("../config");

function authenticate(req, res, next) {
    const header = req.headers.authorization || "";

    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        const error = new Error("Authentication required");
        error.status = 401;
        error.code = "NO_TOKEN";
        return next(error);
    }

    try {
        const payload = jwt.verify(token, config.jwtSecret);

        req.user = {
            id: payload.sub,
            email: payload.email
        };

        next();
    } catch (err) {
        const expired = err.name === "TokenExpiredError";

        const error = new Error(
            expired ? "Token expired" : "Invalid token"
        );

        error.status = 401;
        error.code = expired ? "TOKEN_EXPIRED" : "BAD_TOKEN";

        next(error);
    }
}

module.exports = authenticate;