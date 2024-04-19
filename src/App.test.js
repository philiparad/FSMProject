import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Test rendering of App component
test('renders App component', () => {
  render(<App />);
});

// Test initial state of DataLoader component
test('initial state of DataLoader component', () => {
  const { getByText } = render(<App />);
  expect(getByText('Current State: IDLE')).toBeInTheDocument();
});

// Test state transition on fetch button click
test('state transition on fetch button click', async () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Fetch Data'));
  await waitFor(() => expect(getByText('Current State: LOADING')).toBeInTheDocument());
});

// Test successful data fetching
test('successful data fetching', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: async () => [{ name: { common: 'Country' }, capital: 'Capital', population: 100 }]
  });
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Fetch Data'));
  await waitFor(() => expect(getByText('Country')).toBeInTheDocument());
});

// Test error handling during data fetching
test('error handling during data fetching', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Failed to fetch'));
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Fetch Data'));
  await waitFor(() => expect(getByText('Current State: ERROR')).toBeInTheDocument());
});

// Test state transition on reset button click
test('state transition on reset button click', async () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText('Fetch Data'));
  await waitFor(() => expect(getByText('Current State: LOADING')).toBeInTheDocument());
  fireEvent.click(getByText('Reset'));
  await waitFor(() => expect(getByText('Current State: IDLE')).toBeInTheDocument());
});

// Test rendering of DataIdle component
test('renders DataIdle component', () => {
  const { getByText } = render(<DataIdle />);
  expect(getByText('Current State: IDLE')).toBeInTheDocument();
});

// Test rendering of DataLoading component
test('renders DataLoading component', () => {
  const { getByText } = render(<DataLoading />);
  expect(getByText('Loading...')).toBeInTheDocument();
});

// Test rendering of DataDisplay component
test('renders DataDisplay component with data', () => {
  const data = [{ name: { common: 'Country' }, capital: 'Capital', population: 100 }];
  const { getByText } = render(<DataDisplay data={data} />);
  expect(getByText('Country')).toBeInTheDocument();
});
