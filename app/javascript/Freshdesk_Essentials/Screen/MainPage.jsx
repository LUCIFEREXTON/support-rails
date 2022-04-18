import React from 'react'
import './style.css';
import Layout from '../Components/Tickets/Layout';
import AllTickets from '../Components/Tickets/AllTickets';
import Filter from '../Components/Tickets/Filter';
import { Routes, Route, useLocation  } from "react-router-dom";
import CreateTicket from './CreateTicket';
import Ticket from './Ticket';
// import Faq from './Faq';

import Modal from '../Components/Modal'
import Create from './Create';

const MainPage = () =>{
		return(
		// <Layout>
		// 	<Filter />
		// 	<AllTickets/>
		// 	<Modal id='newTicketModal'>
		// 		<CreateTicket/>
		// 	</Modal>						
		// 	<Modal id='viewTicketModal'>
		// 		<Ticket/>
		// 	</Modal>						
		// </Layout>
		<Routes>
			<Route
				path='/'
				element={
					<Layout>
						<Filter />
						<AllTickets />
					</Layout>
				}
			/>
			<Route
				path='/new'
				element={
					<Create/>
					// <CreateTicket />
				}
			/>
			<Route
				path='/view/:user_id/:id'
				element={
					<Ticket />
				}
			/>
		</Routes>
		// <Routes>
		// 	<Route path="/faq/*" element={<Faq/>} />
		// 	<Route 
		// 		path="/"
		// 		element={
		// 			<Layout>
		// 				<Filter />
		// 				<AllTickets/>
		// 				<Modal id='newTicketModal'>
		// 					<CreateTicket/>
		// 				</Modal>						
		// 				<Modal id='viewTicketModal'>
		// 					<Ticket/>
		// 				</Modal>						
		// 			</Layout>
		// 		}
		// 	/>
		// </Routes>
	)
}

export default MainPage
