import React, { useState, useEffect } from "react"
import axios from "axios"

//create index.js file for bulk imports? It might not be necessary for something this size, but it's best practice.
import { Todo } from "./components/Todo"
import { TodoForm } from "./components/TodoForm"

export const App = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = () => {
    axios.get("/todo")
      .then(response => setTodos(response.data))
      .catch(error => console.log(error))
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
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  return(
    <div>
      <TodoForm 
        submit={addTodo}
        buttonText="Add"
      />
        
      { 
      todos.map(todo => 
        <Todo 
          {...todo} 
          key={todo._id}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />) 
      }
    </div>
  )
}