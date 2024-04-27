import { useState } from 'react';

export const useFSM = (initialState, states, transitions, transitionMap, transitionCallbacks) => {
  const [currentState, setCurrentState] = useState(initialState);

  const transition = (action) => {
    const nextState = transitionMap[currentState][action];
    if (nextState) {
      setCurrentState(nextState);

	  //Notify potential end user, about the new state
	  window.postMessage({ type: 'STATE', payload: {name:currentState} }, '*');

      // Execute the callback function if it exists for this transition
      if (transitionCallbacks && transitionCallbacks[action]) {
        transitionCallbacks[action]();
      }
    } else {
      setCurrentState(states.DEADEND);
    }
  };
  return [currentState, transition];
};
