import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import React from 'react';

const MockComponent = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle</button>
    </>
  );
};

describe('ThemeContext', () => {
  it('toggles between light and dark themes', () => {
    render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>
    );

    expect(screen.getByText(/Theme: light/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByText(/Theme: dark/)).toBeInTheDocument();
  });
});
