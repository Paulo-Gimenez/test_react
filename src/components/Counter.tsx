import { useState, useEffect,useCallback } from "react";
import { debounce } from "../utils";
interface CounterProps {
  initialCount?: number;
  initialStep?: number;
}

export default function Counter({ initialCount = 0, initialStep = 1 }: CounterProps) {
  const [count, setCount] = useState<number>(initialCount);
  const [step, setStep] = useState<number>(initialStep);
  const [history, setHistory] = useState<number[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    setHistory((prev) => [...prev, count]);
  }, [count]);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialCount);
  const clearHistory = () => setHistory([]);
  const incrementAsyncHandler = async () => {
    setIsPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCount((prev) => prev + 1);
    setIsPending(false);
  };
  const incrementAsync = useCallback(debounce(incrementAsyncHandler, 300), []);

  return (
    <div className="card">
      <h2>Counter Component</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Step:
          <input
            type="number"
            value={step}
            disabled= {isPending}
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ marginLeft: "10px", width: "60px" }}
          />
        </label>
      </div>
        
      <div style={{ fontSize: "2em", marginBottom: "20px" }}>
        Count: {count}
      </div>

      <div>
        <button className="button" disabled={isPending} onClick={increment} >+ {step}</button>
        <button className="button" disabled={isPending} onClick={decrement}>- {step}</button>
        <button className="button" disabled={isPending} onClick={reset}>Reset</button>
        <button className="button" onClick={incrementAsync}>+1 (Async)</button>
      </div>{isPending && <p style={{ color: "orange" }}>Procesando...</p>} 
      <div style={{ marginTop: "20px" }}>
        <h3>History ({history.length} items)</h3>
        <button className="button" onClick={clearHistory}>Clear History</button>
        <div
          style={{
            maxHeight: "100px",
            overflow: "auto",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {history.map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
