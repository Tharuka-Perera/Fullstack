const mongoose = require("mongoose");
const { taskRepo } = require("../repos/taskRepo");

async function list(req, res, next) {
    try {
        const tasks = await taskRepo.findAll();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const task = await taskRepo.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const task = await taskRepo.create({
            title: req.body.title,
            assignee: req.body.assignee,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            status: req.body.status
        });

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const task = await taskRepo.deleteById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    list,
    get,
    create,
    remove
};