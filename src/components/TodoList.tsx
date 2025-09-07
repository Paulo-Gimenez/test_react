import { useState, useRef } from "react"

export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

interface TodoListProps {
  todos: Todo[]
  totalTodos: number
  activeCount: number
  completedCount: number
  filter: "all" | "active" | "completed"
  onAddTodo: (text: string) => void
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
  onChangeFilter: (filter: "all" | "active" | "completed") => void
}

export default function TodoList({
  todos,
  totalTodos,
  activeCount,
  completedCount,
  filter,
  onAddTodo,
  onToggleTodo,
  onDeleteTodo,
  onChangeFilter,
}: TodoListProps) {
  const [newTodo, setNewTodo] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      onAddTodo(newTodo)
      setNewTodo("")
      inputRef.current?.focus()
    }
  }

  return (
    <div className="card">
      <h2>Todo List</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            ref={inputRef}
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            style={{ flex: 1, padding: "10px", marginRight: "10px" }}
          />
          <button type="submit" className="button">
            Add Todo
          </button>
        </div>
      </form>

      <div style={{ marginBottom: "20px" }}>
        <button
          className={`button ${filter === "all" ? "active" : ""}`}
          onClick={() => onChangeFilter("all")}
        >
          All ({totalTodos})
        </button>
        <button
          className={`button ${filter === "active" ? "active" : ""}`}
          onClick={() => onChangeFilter("active")}
        >
          Active ({activeCount})
        </button>
        <button
          className={`button ${filter === "completed" ? "active" : ""}`}
          onClick={() => onChangeFilter("completed")}
        >
          Completed ({completedCount})
        </button>
      </div>

      <ul className="user-list">
        {todos.map(todo => (
          <li key={todo.id} className="user-item">
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
                style={{ marginRight: "10px" }}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "#666" : "inherit",
                }}
              >
                {todo.text}
              </span>
            </div>
            <button
              className="button"
              onClick={() => onDeleteTodo(todo.id)}
              style={{ background: "#dc3545" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
          No todos to show
        </div>
      )}
    </div>
  )
}
