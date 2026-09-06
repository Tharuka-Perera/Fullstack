const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },

        status: {
            type: String,
            enum: ["todo", "doing", "done"],
            default: "todo"
        },

        assignee: {
            type: String
        },

        dueDate: {
            type: Date
        },

        priority: {
            type: String,
            enum: ["low", "normal", "high"],
            default: "normal"
        },

        version: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);