import './App.css';
import MainPage from './Screen/MainPage.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from 'react'
import Inputs from './Components/Tickets/Inputs'

function App(){

  return (
		<Router basename={window.location.pathname}>
			{/*<MainPage/>*/}
			<Inputs/>
		</Router>
	);
}

export default App;
