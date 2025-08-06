import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast from './Toast';

jest.useFakeTimers();

describe('Toast', () => {
  const toast = {
    id: 1,
    message: 'This is a test message',
    type: 'info',
  };

  let mockOnClose;

  beforeEach(() => {
    mockOnClose = jest.fn();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('renders the toast message and close button correctly', () => {
    render(<Toast toast={toast} onClose={mockOnClose} />);

    expect(screen.getByText('This is a test message')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('applies the correct class for each toast type', () => {
    const types = ['info', 'success', 'warning', 'error'];

    types.forEach((type) => {
      const { container, unmount } = render(
        <Toast toast={{ ...toast, type }} onClose={mockOnClose} />
      );
      const toastElement = container.querySelector('.toast');

      expect(toastElement).toHaveClass('toast');
      expect(toastElement).toHaveClass(type);

      unmount(); // cleanup between types
    });
  });

  it('calls onClose after the specified timeout', () => {
    const toastWithTimeout = { ...toast, timeout: 4000 };
    render(<Toast toast={toastWithTimeout} onClose={mockOnClose} />);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledWith(toast.id);
  });

  it('does not call onClose if timeout is null', () => {
    render(<Toast toast={{ ...toast, timeout: null }} onClose={mockOnClose} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when the close button is clicked', () => {
    render(<Toast toast={toast} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledWith(toast.id);
  });
});
