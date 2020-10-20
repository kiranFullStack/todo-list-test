import React from 'react'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import AddIcon from '@material-ui/icons/Add'

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
            <div key={todosubtask.id}>
              <h3
                className='todo'
                style={{
                  textDecoration: todosubtask.isComplete ? 'line-through' : '',
                }}
              >
                {todosubtask.title}
              </h3>
              <button onClick={() => completeTodoSubtask(todo.id, index)}>
                Complete Subtask
              </button>
              <button onClick={() => removeTodoSubtask(todo.id, index)}>
                x
              </button>
              <button onClick={() => editTodoSubtask(todo.id, index)}>
                Edit
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}
