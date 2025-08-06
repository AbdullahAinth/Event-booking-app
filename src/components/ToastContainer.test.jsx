// src/components/ToastContainer.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ToastContainer from './ToastContainer';
import { ToastContext } from '../contexts/ToastContext';
import { ThemeContext } from '../contexts/ThemeContext';

describe('ToastContainer', () => {
  const mockToasts = [
    { id: 1, message: 'Test Toast', type: 'success', timeout: 1000 },
    { id: 2, message: 'No Timeout Toast', type: 'error' } // default timeout
  ];

  const mockRemoveToast = jest.fn();

  const renderWithContexts = (theme = 'light', toasts = mockToasts) =>
    render(
      <ThemeContext.Provider value={{ theme }}>
        <ToastContext.Provider value={{ toasts, removeToast: mockRemoveToast }}>
          <ToastContainer />
        </ToastContext.Provider>
      </ThemeContext.Provider>
    );

  test('renders toasts and removes them after timeout or default', async () => {
    renderWithContexts();

    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('No Timeout Toast')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockRemoveToast).toHaveBeenCalledWith(1);
    }, { timeout: 1500 });
  });

  test('applies dark theme class to container', () => {
    renderWithContexts('dark');

    const container = screen.getByRole('region');
    expect(container.classList.contains('dark')).toBe(true);
  });
});
