import React, { useState, useEffect } from 'react'
import Counter from './components/Counter'
import UserList from './components/UserList'
import TodoList from './components/TodoList'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [activeTab, setActiveTab] = useState('counter')
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  
  useEffect(() => {
    document.title = `React Debug Test - ${activeTab}`
  })

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`container ${theme}`}>
      <header>
        <h1>React Debug Test</h1>
        <div>
          <button 
            className="button" 
            onClick={handleThemeToggle}
          >
            Toggle Theme ({theme})
          </button>
        </div>
        
        <nav style={{ margin: '20px 0' }}>
          <button 
            className={`button ${activeTab === 'counter' ? 'active' : ''}`}
            onClick={() => setActiveTab('counter')}
          >
            Counter
          </button>
          <button 
            className={`button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={`button ${activeTab === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveTab('todos')}
          >
            Todos
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'counter' && <Counter />}
        {activeTab === 'users' && <UserList />}
        {activeTab === 'todos' && <TodoList />}
      </main>
    </div>
  )
}

export default App
