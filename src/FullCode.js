import React, { useState, useEffect } from 'react';
// Define the createStyles function to generate CSS
const createStyles = () => `
  .currentState {
    font-weight: bold;
    color: #1890ff;
    margin-bottom: 10px;
    margin-left: 5px;
  }

  .fetchButton, .resetButton, .tryAgainButton {
    background-color: #1890ff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 10px;
    margin-left: 5px;
  }

  .tryAgainButton {
    background-color: #ff4d4f;
  }

  .countryTable {
    width: 500px;
    border-collapse: collapse;
    margin-left: 5px;
  }

  .countryTable th, .countryTable td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  .countryTable th {
    background-color: #f2f2f2;
  }

  .countryTable img {
    vertical-align: middle;
  }

  .dataLoading, .dataIdle {
    width: 500px;
    height: 509px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0; /* Grey background color */
  }

  .spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    animation: spin 1s linear infinite;
  }


  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Define the Finite State Machine Hook
const useFSM = (initialState, states, transitions, transitionMap) => {
  // Define the current state using useState hook
  const [currentState, setCurrentState] = useState(initialState);

  // Define the transition function
  const transition = (action) => {
    // Get the next state from the transition map based on the current state and action
    const nextState = transitionMap[currentState][action];
    // Check if the next state exists in the transition map
    if (nextState) {
      // Update the current state
      setCurrentState(nextState);
    } else {
      // If next state doesn't exist, set the current state to ERROR state
      setCurrentState(states.ERROR);
    }
  };

  // Return the current state and transition function
  return [currentState, transition];
};

// Define the DataLoader component
const DataLoader = () => {
  // Define initial state, states, transitions, and transition mapping locally
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

  // Use the FSM hook with local initial state, states, transitions, and transitionMap
  const [currentState, transition] = useFSM(initialState, states, transitions, transitionMap);
  // Define state to hold the fetched data
  const [data, setData] = useState(null);

  // useEffect hook to fetch data from mock server
  useEffect(() => {
    // Simulate fetching data
    if (currentState === states.LOADING) {
    setTimeout(() => {      
      fetch('https://restcountries.com/v3.1/region/europe')
        .then(response => response.json())
        .then(data => {
          // Simulate success or error based on received data
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
      }, 4000);
    }
  }, [currentState, transition]);

  // Pick 10 random countries from the fetched data
  const randomCountries = data ? getRandomCountries(data, 10) : [];

  // Render the DataLoader component
  return (
    <div>
      <p className="currentState">Current State: {currentState}</p>
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
        <button className="tryAgainButton" onClick={() => transition(transitions.RESET)}>Try Again</button>
      )}
    </div>
  );
};

// Define a function to pick random countries from the data
const getRandomCountries = (data, count) => {
  const shuffled = data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Define the DataDisplay component
const DataDisplay = ({ data }) => {
  return (
    <table className="countryTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Capital</th>
          <th>Population</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>
        {data.map(country => (
          <tr key={country.name.common}>
            <td>{country.name.common}</td>
            <td>{country.capital}</td>
            <td>{country.population}</td>
            <td>
              <img src={country.flags.png} alt={`${country.name.common} Flag`} width="50" height="30" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Define the DataIdle component
const DataIdle = () => {
  return (
    <div className="dataIdle">
      {/* You can adjust the size and background color as needed */}
    </div>
  );
};

// Define the DataLoading component
const DataLoading = () => {
  return (
    <div className="dataLoading">
      <div className="spinner"></div>
    </div>
  );
};

// Define the App component
const App = () => {
  // Generate styles
  const styles = createStyles();

  // Render the DataLoader component with styles
  return (
    <div>
      <style>{styles}</style>
      <DataLoader />
    </div>
  );
};

// Export the App component
export default App;
