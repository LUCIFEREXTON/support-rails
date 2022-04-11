import './App.css'
import MainPage from './Screen/MainPage.jsx'
import axios from 'axios'
import { BrowserRouter as Router} from "react-router-dom"
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import Inputs from './Components/Tickets/Inputs'
import Create from './Screen/Create'

function App(){
	const [route, setRoute] = useState(false)
	const dispatch = useDispatch()
	useEffect(()=>{
		(async ()=>{
			try {
				const res = await axios.get('/ticket/init_settings')
				const {per_page, route} = res.data
				dispatch({type: 'SET_PER_PAGE', per_page})
				setRoute(route)
			} catch (e) {
				dispatch({type:'ERROR', error: e.response.data.message})
			}
		})()
	}, [])

  return (
		route ? <Router basename={route}>
			{/* <Create/> */}
			<MainPage/>
			{/* <Inputs/> */}
		</Router>: <></>
	);
}

export default App;
