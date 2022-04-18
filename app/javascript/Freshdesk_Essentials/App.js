import './App.css'
import MainPage from './Screen/MainPage.jsx'
import axios from 'axios'
import { BrowserRouter as Router} from "react-router-dom"
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import Inputs from './Components/Tickets/Inputs'
import Spinner from './Components/Spinner'

function App(){
	const [route, setRoute] = useState(false)
	const dispatch = useDispatch()
	useEffect(()=>{
		(async ()=>{
			try {
				const res = await axios.get('/ticket/init_settings')
				const {per_page, route, tickets_per_request} = res.data
				dispatch({type: 'SET_PER_PAGE', per_page, tickets_per_request})
				setRoute(route)
			} catch (e) {
				console.log(e)
				dispatch({type:'ERROR', error: e.response.data.message})
			}
		})()
	}, [dispatch])
  return (
		route ? 
		<Router basename={route}>
			<MainPage/>
		</Router>: <Spinner/>
	);
}

export default App;
