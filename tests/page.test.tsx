import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import HomePage from '../app/page';

describe('HomePage component', () => {
  test('renders correctly', () => {
    render(<HomePage />);
    expect(screen.getByText('set theme to green')).toBeInTheDocument();
    expect(screen.getByText('set theme to blue')).toBeInTheDocument();
    expect(screen.getByText('set input value')).toBeInTheDocument();
    expect(screen.getByText('Toggle Checkbox')).toBeInTheDocument();
    expect(screen.getByText('set green')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by title...')).toBeInTheDocument();
  });

  test('changes theme color to green on button click', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('set green'));
    expect(screen.getByText('customColorName = "green"')).toBeInTheDocument();
  });

  test('changes theme color to green on button click', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('set theme to green'));
    expect(screen.getByText('customColorName = "green"')).toBeInTheDocument();
  });

  test('changes input value on button click', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('set input value'));
    expect(screen.getByText('textValue = "new value"')).toBeInTheDocument();
  });

  test('toggles checkbox state on button click', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByText('Toggle Checkbox'));
    expect(screen.getByText('checkboxValue = "true"')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Toggle Checkbox'));
    expect(screen.getByText('checkboxValue = "false"')).toBeInTheDocument();
  });
});
