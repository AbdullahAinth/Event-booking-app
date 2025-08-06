// src/components/__tests__/CategoryFilter.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';

const mockSetCategory = jest.fn();

describe('CategoryFilter', () => {
  it('renders all category buttons', () => {
    render(<CategoryFilter selectedCategory="All" setSelectedCategory={mockSetCategory} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('calls setSelectedCategory on button click', () => {
    render(<CategoryFilter selectedCategory="All" setSelectedCategory={mockSetCategory} />);
    fireEvent.click(screen.getByText('Music'));
    expect(mockSetCategory).toHaveBeenCalledWith('Music');
  });
});
