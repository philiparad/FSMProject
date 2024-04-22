import React from 'react';
import { fireEvent, render, screen, waitFor, getByRole, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataLoader from './DataLoader';

jest.mock('fsm-react', () => ({
  useFSM: (initialState, states, transitions, transitionMap) => {
    let currentState = initialState;
    const setCurrentState = (nextState) => {
      currentState = nextState;
    };
    const transition = (action) => {
      let nextState = transitionMap[currentState][action];
      if (nextState) {
        setCurrentState(nextState);
      } else {
        setCurrentState(states.ERROR);
      }
    };
    return [currentState, transition];
  }
}));

describe('DataLoader component', () => {
  test('renders DataIdle and renders Loading state', async () => {
    render(<DataLoader />);
	waitFor(() =>
    {
    	expect(screen.getByText(/IDLE/i)).toBeInTheDocument();
    	const fetchButton = screen.getByText('Fetch Data');
    	fireEvent.click(fetchButton);
		waitFor(() =>
		{
			expect(screen.getByText(/LOADING/i)).toBeInTheDocument();
			waitFor(() => {
				expect(screen.getByText(/SUCCESS/i)).toBeInTheDocument();
			  }, { timeout: 12000 });
		});
    });
  });

  test('renders DeadEndPanel when transition to DEADEND state', async () => {
    render(<DataLoader />);
	waitFor(() =>
	{
        expect(screen.getByText(/IDLE/i)).toBeInTheDocument();
        const deadEndButton = screen.getByText('Dead End');
        fireEvent.click(deadEndButton);
		waitFor(() =>
		{
			expect(screen.getByText(/DEADEND/i)).toBeInTheDocument();
		});
    });
  });
});
