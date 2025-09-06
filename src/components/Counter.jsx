import React, { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)
  const [history, setHistory] = useState([])

  useEffect(() => {
    setHistory(prev => [...prev, count])
  })

  
  const increment = () => {
    setCount(count + step)
  }

  const decrement = () => {
    setCount(count - step)
  }

  const clearHistory = () => {
    history.length = 0
    setHistory(history)
  }

  const incrementAsync = async () => {
    setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  }

  return (
    <div className="card">
      <h2>Counter Component</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          Step: 
          <input 
            type="number" 
            value={step} 
            onChange={(e) => setStep(e.target.value)}
            style={{ marginLeft: '10px', width: '60px' }}
          />
        </label>
      </div>

      <div style={{ fontSize: '2em', marginBottom: '20px' }}>
        Count: {count}
      </div>

      <div>
        <button className="button" onClick={increment}>
          + {step}
        </button>
        <button className="button" onClick={decrement}>
          - {step}
        </button>
        <button className="button" onClick={() => setCount(0)}>
          Reset
        </button>
        <button className="button" onClick={incrementAsync}>
          +1 (Async)
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>History ({history.length} items)</h3>
        <button className="button" onClick={clearHistory}>
          Clear History
        </button>
        <div style={{ maxHeight: '100px', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {history.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Counter
