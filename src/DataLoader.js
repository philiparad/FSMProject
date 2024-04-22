import React, { useState, useEffect } from 'react';
import DataIdle from './DataIdle';
import DataLoading from './DataLoading';
import DataError from './DataError';
import DataDisplay from './DataDisplay';
import ToggleAPI from './ToggleAPI';
import { useFSM } from 'fsm-react';
import { getRandomCountries } from './utils';

const DataLoader = () => {
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

  const [currentState, transition] = useFSM(initialState, states, transitions, transitionMap);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (currentState === states.LOADING) {
      setTimeout(() => {
		const api = localStorage.getItem('error') === 'true'? 'https://restcountriesxx.com/v3.1/region/europe' : 'https://restcountries.com/v3.1/region/europe';
        fetch(api)
          .then(response => response.json())
          .then(data => {
            if (data) {
              transition(transitions.SUCCESS);
              setData(data);
            } else {
              transition(transitions.ERROR);
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            transition(transitions.ERROR);
          });
      }, 3000);
    }
  }, [currentState, transition]);

  const randomCountries = data ? getRandomCountries(data, 10) : [];
  const currentClass = currentState === states.ERROR? "currentStateError" : "currentState";
  return (
    <div>
	  <ToggleAPI/>
      <p className={currentClass}>** Current State: {currentState} **</p>
      {currentState === states.IDLE && (
        <div>
          <DataIdle />
          <button className="fetchButton" onClick={() => transition(transitions.FETCH)}>Fetch Data</button>
        </div>
      )}
      {currentState === states.LOADING && (
        <DataLoading />
      )}
      {currentState === states.SUCCESS && (
        <div>
          <DataDisplay data={randomCountries} />
          <button className="resetButton" onClick={() => transition(transitions.RESET)}>Reset</button>
        </div>
      )}
      {currentState === states.ERROR && (
        <div>
          <DataError />
          <button className="tryAgainButton" onClick={() => transition(transitions.RESET)}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default DataLoader;
