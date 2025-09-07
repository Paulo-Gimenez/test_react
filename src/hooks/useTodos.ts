import useLocalStorage from "./useLocalStorage"
import { Todo } from "../components/TodoList"

export type TodoFilter = "all" | "active" | "completed"

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [])
  const [filter, setFilter] = useLocalStorage<TodoFilter>("todoFilter", "all")

  const addTodo = (text: string): void => {
    const newTodo: Todo = {
      id: Math.random(),
      text,
      completed: false,
      createdAt: new Date(),
    }
    setTodos(prev => [...prev, newTodo])
  }

  const toggleTodo = (id: number): void => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const deleteTodo = (id: number): void => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const filteredTodos = (() => {
    switch (filter) {
      case "active":
        return todos.filter(t => !t.completed)
      case "completed":
        return todos.filter(t => t.completed)
      default:
        return todos
    }
  })()

  return {
    todos,
    filter,
    filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
  }
}
