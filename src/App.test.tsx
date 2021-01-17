import React from 'react';
import { render, screen } from '@testing-library/react';
import { HashRouter } from "react-router-dom";

import App from './App';

test('Renders Fruits tab', () => {
  render(<HashRouter><App /></HashRouter>);
  const fruitsTablistElement = screen.getByText(/Fruits/i);
  const tabElements = screen.getAllByRole('tab')
  expect(fruitsTablistElement).toBeInTheDocument();
  expect(tabElements).toBeDefined();
});

test('Renders Animals tab', () => {
  render(<HashRouter><App /></HashRouter>);
  const animalsTabkElement = screen.getByText(/Animals/i);
  const tabElements = screen.getAllByRole('tab')
  expect(animalsTabkElement).toBeInTheDocument();
  expect(tabElements).toBeDefined();
});
