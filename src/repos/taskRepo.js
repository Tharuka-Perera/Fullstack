const Task = require("../models/Task");

const taskRepo = {
    async findAll() {
        return Task.find().lean();
    },

    async findById(id) {
        return Task.findById(id).lean();
    },

    async create(data) {
        const task = await Task.create(data);
        return task.toObject();
    },

    async deleteById(id) {
        return Task.findByIdAndDelete(id).lean();
    }
};

module.exports = {
    taskRepo
};