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