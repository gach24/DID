import { useCounter } from "./hooks/useCounter";

export const CounterApp = () => {
  const { counter, increment, reset, decrement } = useCounter();

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Counter: {counter}</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={increment}>+1</button>
        <button onClick={reset}>Reset</button>
        <button onClick={decrement}>-1</button>
      </div>
    </div>
  );
};