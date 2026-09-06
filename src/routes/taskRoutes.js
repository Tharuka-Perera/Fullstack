const express = require("express");
const controller = require("../controllers/taskController");
const validate = require("../middleware/validate");
const { createTaskSchema } = require("../schemas/taskSchema");

const router = express.Router();

router.get("/", controller.list);

router.get("/:id", controller.get);

router.post(
    "/",
    validate(createTaskSchema, "body"),
    controller.create
);

router.delete("/:id", controller.remove);

module.exports = router;