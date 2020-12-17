const express = require("express")
const todoRouter = express.Router()
const Todo = require("../client/models/todo.js")

todoRouter.get("/", (req, res, next) => {
    Todo.find((error, todos) => {
        if(error){
            res.status(500)
            return next(error)
        }
        return res.status(200).send(todos)
    })
})

todoRouter.post("/", (req, res, next) => {
    const newTodo = new Todo(req.body)
    newTodo.save((error, savedTodo) => {
        if(error){
            res.status(500)
            return next(error)
        }
        return res.status(201).send(savedTodo)
    })
})

todoRouter.delete("/:todoId", (req, res, next) => {
    Todo.findOneAndDelete(
        { _id: req.params.todoId },
        (error, deletedTodo) => {
            if(error){ 
                res.status(500)
                return next(error)
            }
            return res.status(200).send(`"${deletedTodo.title}" removed successfully!`)
        }
    )
})

todoRouter.put("/:todoId", (req, res, next) => {
    Todo.findOneAndUpdate(
        { _id: req.params.todoId },
        req.body,
        { new: true },
        (error, modifiedTodo) => {
            if(error){
                res.status(500)
                return next(error)
            }
            return res.status(201).send(modifiedTodo)
        }
    )
})

module.exports = todoRouter