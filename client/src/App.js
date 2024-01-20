import React, { useState, useEffect } from "react"
import axios from "axios"

//create index.js file for bulk imports? It might not be necessary for something this size, but it's best practice. 
//move all functions/requests to this doc and export them as a single variable name? for organizational purposes, ofc ofc
//strikethrough text on completed items and completed button "mark done"
//wrap stuff in context so I can clean up this garbage

import { Todo } from "./components/Todo"
import { TodoForm } from "./components/TodoForm"

export const App = () => {
  const [todos, setTodos] = useState([])

  const getTodos = () => {
    axios.get("/todo")
      .then(response => {
        console.log("Todo API Response:", response); 
        setTodos(response.data);
      })
      .catch(error => {
        if (error.response.status === 500) {
          console.log("Fields can't be empty.");
        } else {
          console.log(error);
        }
      });
  }

  const addTodo = (addTodo) => {
    axios.post("/todo", addTodo)
      .then(response => {
        setTodos(prevTodos => [...prevTodos, response.data])
      })
      .catch(error => console.log(error))
  }

  const deleteTodo = (todoId) => {
    axios.delete(`/todo/${todoId}`)
      .then(response => {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
      })
      .catch(error => console.log(error))
  }

  const editTodo = (updates, todoId) => {
    axios.put(`/todo/${todoId}`, updates)
      .then(response => {
        setTodos(prevTodos => prevTodos.map(todo => todo._id !== todoId ? todo : response.data))
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getTodos()
  }, [])

  return(
    <>
      <div className="header">
        <div className="center">
          <h1>TAKE NOTES</h1>
          <h1 className="font"><a target="_blank" rel="noreferrer" href="https://www.zachheckert.com/">By Zach</a></h1>
        </div>
        <div className="center">
          <TodoForm 
            submit={addTodo}
            buttonText="Add"
          />
        </div>
      </div>
      
    <div className="grid">
      {todos.map(todo => 
        <Todo 
          {...todo} 
          key={todo._id}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      )}
    </div>
  </>
  )
}