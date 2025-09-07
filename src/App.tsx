import { useState, useEffect } from "react"
import Counter from "./components/Counter"
import UserList from "./components/UserList"
import TodoList from "./components/TodoList"
import useLocalStorage from "./hooks/useLocalStorage"
import { useTodos } from "./hooks/useTodos"

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("counter")
  const [theme, setTheme] = useLocalStorage<string>("theme", "light")
  const {
    todos,
    filter,
    filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
  } = useTodos()

  useEffect(() => {
    document.title = `React Debug Test - ${activeTab}`
  }, [activeTab])

  const handleThemeToggle = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  return (
    <div className={`container ${theme}`}>
      <header>
        <h1>React Debug Test</h1>
        <div>
          <button className="button" onClick={handleThemeToggle}>
            Toggle Theme ({theme})
          </button>
        </div>

        <nav style={{ margin: "20px 0" }}>
          <button
            className={`button ${activeTab === "counter" ? "active" : ""}`}
            onClick={() => setActiveTab("counter")}
          >
            Counter
          </button>
          <button
            className={`button ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`button ${activeTab === "todos" ? "active" : ""}`}
            onClick={() => setActiveTab("todos")}
          >
            Todos
          </button>
        </nav>
      </header>

      <main>
        {activeTab === "counter" && <Counter />}
        {activeTab === "users" && <UserList />}
        {activeTab === "todos" && (
          <TodoList
            todos={filteredTodos}
            totalTodos={todos.length}
            activeCount={todos.filter(t => !t.completed).length}
            completedCount={todos.filter(t => t.completed).length}
            filter={filter}
            onAddTodo={addTodo}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onChangeFilter={setFilter}
          />
        )}
      </main>
    </div>
  )
}
