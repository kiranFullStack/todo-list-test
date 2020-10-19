import React, { useState, useEffect } from 'react'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import auth from './auth'

function Dashboard(props) {
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
  let postTodos = (title) => {
    axios
      .post('http://[::1]:3000/todos/', {
        title: title,
        isComplete: false,
        subtasks: [],
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  let deleteTodos = (id) => {
    axios
      .delete(`http://[::1]:3000/todos/${id}`)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  let patchTodo = (id, title, isComplete, subtasks) => {
    console.log(
      title,
      isComplete,
      '<------This is the data😊😊😊😊😊😊😊😊😊😊😊😊'
    )
    axios
      .patch(`http://[::1]:3000/todos/${id}`, {
        title: title,
        isComplete: isComplete,
        subtasks: subtasks,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
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
    console.log(title, '<------This is the data😊😊😊😊😊😊😊😊😊😊😊😊')
    postTodos(title)
  }

  const addTodoSubtask = (index) => {
    let newSubtask = prompt('Please add a subtask')
    const newTodos = [...todos]
    console.log(newTodos[index].subtasks, ';;;;')

    newTodos &&
      newTodos[index].subtasks.push({
        id: uuidv4(),
        title: newSubtask,
        isComplete: false,
      })
    console.log(index)
    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)

    // setTodos(newTodos)
  }

  const completeTodo = (index) => {
    console.log(index, ':::')
    const newTodos = [...todos]
    newTodos[index].isComplete = !newTodos[index].isComplete
    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)
  }

  const completeTodoSubtask = (todoId, todosubtaskId) => {
    console.log(todoId, todosubtaskId, ':::')
    let index = todos.findIndex((element) => element.id === todoId)
    console.log(todos[index].subtasks[todosubtaskId], '?????')
    const newTodos = [...todos]
    newTodos[index].subtasks[todosubtaskId].isComplete = !newTodos[index]
      .subtasks[todosubtaskId].isComplete
    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)
  }

  const removeTodo = (index) => {
    console.log(index, ':::')
    const newTodos = [...todos]
    deleteTodos(newTodos[index].id)
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  const removeTodoSubtask = (todoId, todosubtaskId) => {
    console.log(todoId, todosubtaskId, ':::')
    let index = todos.findIndex((element) => element.id === todoId)
    console.log(todos[index].subtasks, '?????')
    const newTodos = [...todos]
    newTodos[index].subtasks.splice(todosubtaskId, 1)
    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)
  }

  const editTodo = (index) => {
    var editted = prompt('Please edit here', todos[index].title)
    console.log(index, editted)
    const newTodos = [...todos]
    newTodos[index].title = editted
    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)
  }

  const editTodoSubtask = (todoId, todosubtaskId) => {
    console.log(todoId, todosubtaskId, ':::')
    let index = todos.findIndex((element) => element.id === todoId)
    console.log(todos[index].subtasks, '?????')
    const newTodos = [...todos]
    console.log(newTodos[index].subtasks[todosubtaskId].title, ',<<<<<<<')
    var edittedSubtask = prompt(
      'Please edit here',
      newTodos[index].subtasks[todosubtaskId].title
    )
    newTodos[index].subtasks[todosubtaskId].title = edittedSubtask
    patchTodo(
      newTodos[index].id,
      newTodos[index].title,
      newTodos[index].isComplete,
      newTodos[index].subtasks
    )
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <div className='todo-list'>
        <button
          onClick={() => {
            auth.logout(() => {
              props.history.push('/')
            })
          }}
        >
          Logout
        </button>
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
        {/* {JSON.stringify(todos)} */}
      </div>
    </div>
  )
}

export default Dashboard
