import React, { useState, useEffect } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import auth from '../auth'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import logo from './logo-TC.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useSound from 'use-sound'
import cheering from './cheering.mp3'
import bloop from './bloop.mp3'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#1D2B30',
  },
}))

function Dashboard(props) {
  const [todos, setTodos] = useState([])
  const [play] = useSound(cheering)
  const [playBloop] = useSound(bloop)

  const notify = () =>
    toast.success('YOU are Awesome!🍾', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })

  const errornotify = () =>
    toast.error('Oops...Try again', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    })

  let fetchTodos = () => {
    axios
      .get('http://[::1]:3000/todos/')
      .then(function (response) {
        console.log(response.data)
        let reversedarray = response.data.reverse()
        setTodos(reversedarray)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        errornotify()
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
        // notify()
        // play()
        playBloop()
      })
      .catch(function (error) {
        console.log(error)
        error()
      })
  }

  let deleteTodos = (id) => {
    axios
      .delete(`http://[::1]:3000/todos/${id}`)
      .then(function (response) {
        console.log(response)
        notify()
        play()
      })
      .catch(function (error) {
        console.log(error)
        error()
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
        error()
      })
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = (title) => {
    const newTodos = [
      { id: uuidv4(), title, isComplete: false, subtasks: [] },
      ...todos,
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

  const classes = useStyles()

  return (
    <div className='app'>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar className='toolbar'>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt='Torre Capital' />
          <Typography variant='h6' className={classes.title}></Typography>
          <Button
            onClick={() => {
              auth.logout(() => {
                props.history.push('/')
              })
            }}
            color='inherit'
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <div className='todo-list'>
        <TodoForm addTodo={addTodo} />

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

        <hr />
        {/* {JSON.stringify(todos)} */}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Dashboard
