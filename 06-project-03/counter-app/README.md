# Testing de counter-app

## Creación del custom hook
Creamos una carpeta `/src/hooks` y dentro un fichero llamado useCounter.tsx

```ts
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
```

A continuación creamos el componente principal `/src/CounterApp.tsx` donde se añadira las funcionalidades del contador

```tsx
import { useCounter } from './hooks/useCounter';

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
```

Un compoenente `/src/header.tsx`

```tsx
interface HeaderProps {
  title: string;
  description?: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
  );
};
```

En el componente `/src/main.tsx` utilizaremos el **Header** y el **CounterApp**

```ts
...
  <StrictMode>
    <>
      <Header 
        title="Counter App" 
        description="A simple counter application using a custom hook." />
      <CounterApp />
    </>
  </StrictMode>
...
```

## Instalación de dependencias

```bash
npm install --save-dev @testing-library/react @testing-library/dom vitest jsdom
```

## Scripts de ejecución

```json
"scripts": {
  "test": "vitest",
  "test:ui": "vitest --ui",
  "coverage": "vitest run --coverage"
}
```

## Configuración del vite.config.ts

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

## Pruebas del componente Header.tsx

```tsx
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Header } from './Header';

const title = 'Test Title';

describe('Header component', () => {
  test('should render the title correctly', () => {
    // Arrange & Act
    render(<Header title={title} />);

    // Assert
    expect(screen.getByText(title)).toBeDefined();
  });

  test('should show title and description', () => {
    // Arrange
    const description = 'Test Description';

    // Act
    render(<Header title={title} description={description} />);

    // Assert
    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole('paragraph')).toBeDefined();
    expect(screen.getByRole('paragraph').innerHTML).toBe(description);
  });

  test('should show only title when description is not provided', () => {
    // Arrange & Act
    const { container } = render(<Header title={title} />);
    const divElement = container.querySelector('div');
    const h1Element = divElement?.querySelector('h1');
    const pElement = divElement?.querySelector('p');

    // Assert
    expect(h1Element?.innerHTML).toBe(title);
    expect(pElement).toBeNull();
  });
});
```

## Pruebas del hook `useCounter.ts'

- Creamos la agrupación de pruebas para este hook

```ts
describe('useCounter Hook', () => {
  ...
})
```

- Comprobación de valores por defecto

```ts
test('should return the default values', () => {
  // Act
  const { result } = renderHook(() => useCounter()); // Necesario para renderizar el hook
  const { counter } = result.current; // Extracción del valor del counter

  // Assert
  expect(counter).toBe(0); // Comprabación del valor
});
```

- Comprobación del comportamiento con parámetros

```ts
  test('should initialize counter with given initial value', () => {
    // Arrange
    const initialValue = 10;

    // Act
    const { result } = renderHook(() => useCounter(initialValue));
    const { counter } = result.current;

    // Assert
    expect(counter).toBe(initialValue);
  });
```

- Comprobación del incremento del contador

```ts
  test('should increment the counter', () => {
    // Arrange
    const { result } = renderHook(() => useCounter());
    const { increment } = result.current;

    // Act
    act(() => {
      increment();
    });
    const { counter } = result.current;

    // Assert
    expect(counter).toBe(1);
  });
```

- Comprobación del decremento del contador

```ts
  test('should decrement the counter', () => {
    // Arrange
    const { result } = renderHook(() => useCounter());
    const { decrement } = result.current;

    // Act
    act(() => {
      decrement();
    });
    const { counter } = result.current;

    // Assert
    expect(counter).toBe(-1);
  });
```

- Comprobar el reseteo del contador

```ts
  test('should reset the counter to initial value', () => {
    // Arrange
    const initialValue = 5;
    const { result } = renderHook(() => useCounter(initialValue));
    const { increment, reset } = result.current;

    // Act
    act(() => {
      increment();
      reset();
    });
    const { counter } = result.current;

    // Assert
    expect(counter).toBe(initialValue);
  });

```

# Pruebas del componente CounterApp.tsx

- Creamos la agrupación de pruebas para este componente

```ts
describe('CounterApp tests', () => {
  ...
})
```

- Comporobación de que el componente se renderiza con los valores por defecto

```ts
  test('should render correctly with default values', () => {
    // Arrange & Act
    render(<CounterApp />);

    // Assert
    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      'Counter: 0'
    );
    expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
  });
```

- Comprobación de los eventos 
```ts
  test('should increment the counter', () => {
    // Arrange
    render(<CounterApp />);
    const heading = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '+1' });

    // Act
    fireEvent.click(button);

    // Assert
    expect(heading.innerHTML).toContain('Counter: 1');
  });

  test('should decrement the counter', () => {
    // Arrange
    render(<CounterApp />);
    const heading = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '-1' });
    screen.debug();

    // Act
    fireEvent.click(button);

    // Assert
    expect(heading.innerHTML).toContain('Counter: -1');
  });
```

