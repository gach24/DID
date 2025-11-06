import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { CounterApp } from './CounterApp';

describe('CounterApp tests', () => {
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
});
