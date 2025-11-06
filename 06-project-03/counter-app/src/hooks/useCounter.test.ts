import { describe, expect, test } from 'vitest';
import { useCounter } from './useCounter';
import { renderHook } from '@testing-library/react';
import { act } from 'react';

describe('useCounter Hook', () => {
  test('should return the default values', () => {
    // Act
    const { result } = renderHook(() => useCounter());
    const { counter } = result.current;

    // Assert
    expect(counter).toBe(0);
  });

  test('should initialize counter with given initial value', () => {
    // Arrange
    const initialValue = 10;

    // Act
    const { result } = renderHook(() => useCounter(initialValue));
    const { counter } = result.current;

    // Assert
    expect(counter).toBe(initialValue);
  });

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

  test('should reset the counter to 0', () => {
    // Arrange
    const { result } = renderHook(() => useCounter());
    const { increment, reset } = result.current;

    // Act
    act(() => {
      increment();
      reset();
    });
    const { counter } = result.current;

    // Assert
    expect(counter).toBe(0);
  });
});
