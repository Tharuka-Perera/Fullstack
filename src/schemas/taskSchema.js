const { z } = require("zod");

const createTaskSchema = z.object({
    title: z.string().min(3),
    status: z.enum(["todo", "doing", "done"]).default("todo"),
    assignee: z.string().optional(),
    dueDate: z.coerce.date().optional(),
    priority: z.enum(["low", "normal", "high"]).default("normal")
});

module.exports = {
    createTaskSchema
};