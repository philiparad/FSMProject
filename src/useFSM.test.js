import { renderHook, act } from '@testing-library/react-hooks';
import { useFSM } from './useFSM';

describe('useFSM Hook', () => {
  test('should initialize with the correct initial state', () => {
    const initialState = 'IDLE';
    const states = {
      IDLE: 'IDLE',
      LOADING: 'LOADING',
      SUCCESS: 'SUCCESS',
      ERROR: 'ERROR'
    };
    const transitions = {
      FETCH: 'FETCH',
      SUCCESS: 'SUCCESS',
      ERROR: 'ERROR',
      RESET: 'RESET'
    };
    const transitionMap = {
      [states.IDLE]: {
        [transitions.FETCH]: states.LOADING
      },
      [states.LOADING]: {
        [transitions.SUCCESS]: states.SUCCESS,
        [transitions.ERROR]: states.ERROR
      },
      [states.SUCCESS]: {
        [transitions.RESET]: states.IDLE
      },
      [states.ERROR]: {
        [transitions.RESET]: states.IDLE
      }
    };

    const { result } = renderHook(() => useFSM(initialState, states, transitions, transitionMap));
    expect(result.current[0]).toBe(initialState);
  });

  test('should transition to the correct state', () => {
    const initialState = 'IDLE';
    const states = {
      IDLE: 'IDLE',
      LOADING: 'LOADING',
      SUCCESS: 'SUCCESS',
      ERROR: 'ERROR'
    };
    const transitions = {
      FETCH: 'FETCH',
      SUCCESS: 'SUCCESS',
      ERROR: 'ERROR',
      RESET: 'RESET'
    };
    const transitionMap = {
      [states.IDLE]: {
        [transitions.FETCH]: states.LOADING
      },
      [states.LOADING]: {
        [transitions.SUCCESS]: states.SUCCESS,
        [transitions.ERROR]: states.ERROR
      },
      [states.SUCCESS]: {
        [transitions.RESET]: states.IDLE
      },
      [states.ERROR]: {
        [transitions.RESET]: states.IDLE
      }
    };

    const { result } = renderHook(() => useFSM(initialState, states, transitions, transitionMap));

    act(() => {
      result.current[1]('FETCH');
    });

    expect(result.current[0]).toBe(states.LOADING);
  });
});
