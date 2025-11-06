import { useState } from 'react';

export const useCounter = (initialValue: number = 0) => {
  const [counter, setCounter] = useState<number>(initialValue);

  const increment = () => {
    setCounter(prev => prev + 1);
  };

  const reset = () => {
    setCounter(initialValue);
  };

  const decrement = () => {
    setCounter(prev => prev - 1);
  };

  return { counter, increment, reset, decrement };
};
