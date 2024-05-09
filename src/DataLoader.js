import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import apiSettings from "./APISettings";
import callbackStatus from "./CallbackStatus";
import DataIdle from './DataIdle';
import DataLoading from './DataLoading';
import DataError from './DataError';
import DataDisplay from './DataDisplay';
import DeadEndPanel from './DeadEndPanel';
import DataMessagePanel from './DataMessagePanel';
import CallBackPanel from './CallBackPanel';
import { useFSM } from 'fsm-react';
import { getRandomCountries } from './utils';

const DataLoader = observer(() => {
  const initialState = 'IDLE';
  const states = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    DEADEND: 'DEADEND'
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
    },
    [states.DEADEND]: {
	      [transitions.RESET]: states.IDLE
    }
  };

  const transitionCallbacks = {
	  [transitions.FETCH]: () => {
		callbackStatus.setMsg('Callback: Transitioning to FETCH');
	  },
	  [transitions.SUCCESS]: () => {
		callbackStatus.setMsg('Callback: Transitioning to SUCCESS');
	  },
	  [transitions.ERROR]: () => {
		callbackStatus.setMsg('Callback: Transitioning to ERROR');
	  },
	  [transitions.RESET]: () => {
		callbackStatus.setMsg('Callback: Transitioning to RESET');
	  }
  };

  const [currentState, transition] = useFSM(initialState, states, transitions, transitionMap, transitionCallbacks);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (currentState === states.LOADING) {
      setTimeout(() => {
		let api = apiSettings.api;

		// Check if 'mock' parameter is present in the URL and update API accordingly
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.has('mock')) {
			api = 'http://localhost:9000/countries_mock';
		}

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
	<div style={{display:'flex'}}>
		<div>
			<div style={{width:600,height:640}}>
			  <p className={currentClass}>** Current State: {currentState} **</p>
			  {currentState === states.IDLE && (
				<div>
				  <DataIdle />
				  <button type="button"	className="fetchButton" onClick={() => transition(transitions.FETCH)}>Fetch Data</button>
				  <button type="button"	className="tryAgainButton" onClick={() => transition(transitions.NONEXISTING)}>Dead End</button>
				</div>
			  )}
			  {currentState === states.LOADING && (
				<div>
				  <DataLoading />
				</div>
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
			  {currentState === states.DEADEND && (
				<div>
				  <DeadEndPanel />
				  <button className="tryAgainButton" onClick={() => transition(transitions.RESET)}>Try Again</button>
				</div>
			  )}
			</div>
			<DataMessagePanel />
		</div>
		    <div>
			   <div className="fsm-diagram"/>
			   <CallBackPanel />
		    </div>
	</div>
  );
});

export default DataLoader;
