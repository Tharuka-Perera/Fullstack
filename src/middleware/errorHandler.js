function notFoundHandler(req, res, next) {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
}

function errorHandler(err, req, res, next) {
    const status = err.status || 500;

    if (status >= 500) {
        console.error(err);
    }

    res.status(status).json({
        message: status === 500
            ? "Something went wrong"
            : err.message,
        requestId: req.id
    });
}

module.exports = {
    notFoundHandler,
    errorHandler
};