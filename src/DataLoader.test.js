import { fireEvent, render, screen, waitFor, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import DataLoader from './DataLoader';

jest.mock('fsm-react', () => ({
  useFSM: () => {
    return ['LOADING',jest.fn(()=> 'LOADING')];
  }
}));

describe('DataLoader Test', () => {
  test('renders DataLoader component', async () => {
    act(() => {
      render(<DataLoader />);
    });
	  screen.debug();
	  expect(screen.getByText(/LOADING/i)).toBeInTheDocument;
  });
});

