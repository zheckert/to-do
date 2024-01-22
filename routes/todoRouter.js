const express = require("express")
const todoRouter = express.Router()
const Todo = require("../client/models/todo.js")

todoRouter.get("/", async (req, res, next) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  });

todoRouter.post("/", async (req, res, next) => {
try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
} catch (error) {
    res.status(500).json({ errorMessage: error.message });
}
});

todoRouter.delete("/:todoId", async (req, res, next) => {
try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.todoId });
    res.status(200).json(`"${deletedTodo.title}" removed successfully!`);
} catch (error) {
    res.status(500).json({ errorMessage: error.message });
}
});

todoRouter.put("/:todoId", async (req, res, next) => {
    try {
      const modifiedTodo = await Todo.findOneAndUpdate(
        { _id: req.params.todoId },
        req.body,
        { new: true }
      );
      res.status(201).json(modifiedTodo);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  });

module.exports = todoRouter