import React, { useState, useEffect } from 'react'
import './App.css'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])

  let fetchTodos = () => {
    axios
      .get('http://[::1]:3000/todos/')
      .then(function (response) {
        console.log(response.data)
        setTodos(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = (title) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), title, isComplete: false, subtasks: [] },
    ]
    setTodos(newTodos)
  }

  const addTodoSubtask = (index) => {
    let newSubtask = prompt('Please add a subtask')
    const newTodos = [...todos]
    console.log(newTodos[index].subtasks, ';;;;')

    newTodos[index].subtasks.push({
      id: uuidv4(),
      title: newSubtask,
      isComplete: false,
    })
    console.log(index)
    setTodos(newTodos)

    // setTodos(newTodos)
  }

  const completeTodo = (index) => {
    console.log(index, ':::')
    const newTodos = [...todos]
    newTodos[index].isComplete = !newTodos[index].isComplete
    setTodos(newTodos)
  }

  const completeTodoSubtask = (todoId, todosubtaskId) => {
    console.log(todoId, todosubtaskId, ':::')
    let x = todos.findIndex((element) => element.id === todoId)
    console.log(todos[x].subtasks[todosubtaskId], '?????')
    const newTodos = [...todos]
    newTodos[x].subtasks[todosubtaskId].isComplete = !newTodos[x].subtasks[
      todosubtaskId
    ].isComplete
    setTodos(newTodos)
  }

  const removeTodo = (index) => {
    console.log(index, ':::')

    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const removeTodoSubtask = (todoId, todosubtaskId) => {
    console.log(todoId, todosubtaskId, ':::')
    let x = todos.findIndex((element) => element.id === todoId)
    console.log(todos[x].subtasks, '?????')
    const newTodos = [...todos]
    newTodos[x].subtasks.splice(todosubtaskId, 1)
    setTodos(newTodos)
  }

  const editTodo = (index) => {
    var editted = prompt('Please edit here', todos[index].title)
    console.log(index, editted)
    const newTodos = [...todos]
    newTodos[index].title = editted
    setTodos(newTodos)
  }

  const editTodoSubtask = (todoId, todosubtaskId) => {
    console.log(todoId, todosubtaskId, ':::')
    let x = todos.findIndex((element) => element.id === todoId)
    console.log(todos[x].subtasks, '?????')
    const newTodos = [...todos]
    console.log(newTodos[x].subtasks[todosubtaskId].title, ',<<<<<<<')
    var edittedSubtask = prompt(
      'Please edit here',
      newTodos[x].subtasks[todosubtaskId].title
    )
    newTodos[x].subtasks[todosubtaskId].title = edittedSubtask
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <div className='todo-list'>
        {todos &&
          todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              completeTodoSubtask={completeTodoSubtask}
              removeTodo={removeTodo}
              removeTodoSubtask={removeTodoSubtask}
              editTodo={editTodo}
              editTodoSubtask={editTodoSubtask}
              addTodoSubtask={addTodoSubtask}
            />
          ))}
        <TodoForm addTodo={addTodo} />

        <hr />
        {JSON.stringify(todos)}
      </div>
    </div>
  )
}

export default App
