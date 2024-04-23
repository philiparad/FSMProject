import { useState } from 'react';

export const useFSM = (initialState, states, transitions, transitionMap) => {
  const [currentState, setCurrentState] = useState(initialState);

  const transition = (action) => {
    const nextState = transitionMap[currentState][action];
    if (nextState) {
      setCurrentState(nextState);
    } else {
      setCurrentState(states.DEADEND);
    }
  };

  return [currentState, transition];
};
