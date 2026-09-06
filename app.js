require("dotenv").config();

const express = require("express");

const requestId = require("./src/middleware/requestId");
const requestLogger = require("./src/middleware/requestLogger");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

const {
    notFoundHandler,
    errorHandler
} = require("./src/middleware/errorHandler");

app.use(express.json());

app.use(requestId);

app.use(requestLogger);

app.use("/api/tasks", taskRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;