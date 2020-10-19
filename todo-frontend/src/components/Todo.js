import React from 'react'

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
      className='todo'
      style={{ textDecoration: todo.isComplete ? 'line-through' : '' }}
    >
      <h1>{todo.title}</h1>
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
        <button onClick={() => editTodo(index)}>Edit</button>
        <button onClick={() => addTodoSubtask(index)}>Add Subtask</button>
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
