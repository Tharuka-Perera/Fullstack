const { randomUUID } = require("crypto");

function requestId(req, res, next) {
    req.id = req.headers["x-request-id"] || randomUUID();

    res.set("X-Request-Id", req.id);

    next();
}

module.exports = requestId;