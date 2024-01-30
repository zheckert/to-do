import React, { useState, useEffect } from "react"
import axios from "axios"
import { Todo } from "./components/Todo"
import { TodoForm } from "./components/TodoForm"
import { GithubIcon } from "./components/GithubIcon"

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'https://zheckert-todo.onrender.com'
  : 'http://localhost:3000';

export const App = () => {
  const [todos, setTodos] = useState([])

  const getTodos = () => {
    axios.get("/todo")
      .then(response => {
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
      <div>
        <div className="center">
          <div  className="header">TAKE NOTES</div>
          <div className="font"><span className="name">By Zach</span><span className="github"><GithubIcon /></span></div>
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