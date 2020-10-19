import React from 'react'

export default function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <input
        type='text'
        className='input'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}
