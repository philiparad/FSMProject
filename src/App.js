import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import ToggleAPI from './ToggleAPI';
import DataLoader from './DataLoader';
import './App.scss';
//import { createStyles } from './createStyles';

const App = () => {

	//const styles = createStyles();
	return (
		<div>
		  <h1 className="header">FSM (Finite State Machine) for conditional UI, in React applications</h1>
		  <ToggleAPI/>
		  <DataLoader />
		</div>
	)
};

export default App;
