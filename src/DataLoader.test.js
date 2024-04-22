import { fireEvent, render, screen, waitFor, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import DataLoader from './DataLoader';

jest.mock('fsm-react', () => ({
  useFSM: (initialState, states, transitions, transitionMap) => {
	  let currentState = initialState;
	  const setCurrentState = (nextState) => {
		currentState = nextState;
	  };
	  const transition = (action) => {
		const nextState = transitionMap[currentState][action];
		if (nextState) {
		  setCurrentState(nextState);
		} else {
		  setCurrentState(states.ERROR);
		}
	  };
	  return [currentState, transition];
	}
}));

describe('DataLoader Test', () => {
  test('renders DataLoader component', async () => {
    act(() => {
      render(<DataLoader />);
    });
    expect(screen.getByText(/IDLE/i)).toBeInTheDocument;

	const fetchButton = screen.getByText(/Fetch Data/i);
	await fireEvent.click(fetchButton);

	waitFor(() =>
	{
	   expect(screen.getByText(/LOADING/i)).toBeInTheDocument;
	   jest.setTimeout(4000);
	   expect(screen.getByText(/SUCCESS/i)).toBeInTheDocument;
	});
  });
});
