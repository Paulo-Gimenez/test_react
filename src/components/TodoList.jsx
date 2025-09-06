import React, { useState, useEffect, useRef } from 'react'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState('all')
  const inputRef = useRef()

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Math.random(),
        text: newTodo,
        completed: false,
        createdAt: new Date()
      }
      setTodos([...todos, todo])
      setNewTodo('')
      inputRef.current.focus()
    }
  }

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id)
    todo.completed = !todo.completed
    setTodos([...todos])
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const filteredTodos = getFilteredTodos()

  return (
    <div className="card">
      <h2>Todo List</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            ref={inputRef}
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            style={{ flex: 1, padding: '10px', marginRight: '10px' }}
          />
          <button type="submit" className="button">
            Add Todo
          </button>
        </div>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <button 
          className={`button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </button>
        <button 
          className={`button ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({todos.filter(t => !t.completed).length})
        </button>
        <button 
          className={`button ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({todos.filter(t => t.completed).length})
        </button>
      </div>

      <ul className="user-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="user-item">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#666' : 'inherit'
              }}>
                {todo.text}
              </span>
            </div>
            <button 
              className="button" 
              onClick={() => deleteTodo(todo.id)}
              style={{ background: '#dc3545' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No todos to show
        </div>
      )}
    </div>
  )
}

export default TodoList
