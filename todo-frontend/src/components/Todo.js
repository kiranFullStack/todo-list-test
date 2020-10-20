import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'

export default function Todo({
  todo,
  index,
  completeTodo,
  removeTodo,
  completeTodoSubtask,
  removeTodoSubtask,
  editTodo,
  editTodoSubtask,
  addTodoSubtask,
}) {
  return (
    <div
      className='main-container'
      style={{ textDecoration: todo.isComplete ? 'line-through' : '' }}
    >
      <div className='task-container'>
        <h1>{todo.title}</h1>
        <div>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => completeTodo(index)}
          >
            <CheckCircleIcon />
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => removeTodo(index)}
          >
            <DeleteIcon />
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => editTodo(index)}
          >
            <EditIcon />
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => addTodoSubtask(index)}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
      <div>
        {todo &&
          todo.subtasks &&
          todo.subtasks.map((todosubtask, index) => (
            <div key={todosubtask.id} className='subtask-container'>
              <h3
                className='todo'
                style={{
                  textDecoration: todosubtask.isComplete ? 'line-through' : '',
                }}
              >
                {todosubtask.title}
              </h3>
              <div>
                <IconButton onClick={() => completeTodoSubtask(todo.id, index)}>
                  <CheckCircleIcon />
                </IconButton>

                <IconButton onClick={() => editTodoSubtask(todo.id, index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => removeTodoSubtask(todo.id, index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
