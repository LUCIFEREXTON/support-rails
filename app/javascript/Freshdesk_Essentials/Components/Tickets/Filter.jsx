import { useState, useEffect, useCallback } from "react";
import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'


const Filter = () =>{
  // const [filtered_tickets, set_filtered_tickets] = useState([]);
  const [dropdown, set_dropdown] = useState(false)
  const dispatch = useDispatch()
  const toggleDropdown = () => set_dropdown(!dropdown)
  const { 
    filter_type,
    sort_type,
    // filter_list,
    // total,
    ticket_per_page,
    tickets_per_request,
    ticket_page,
    open,
    close,
    reload,
    // next_open,
    // next_close,
    all_fetched } = useSelector( state => state)

  // changeing filter open|all
  const changefilter = event => {
		if (event.target.dataset.status === filter_type){
			return
		}
    dispatch({
      type:'UPDATE_FILTER', 
      filter_type: event.target.dataset.status,
      sort_type
    })
  }
  //changeing sorting updated_at|created_at
	const sorting = (event) => {
    if( event.target.dataset.type === sort_type ){ 
      toggleDropdown()
      return
    }
    dispatch({
      type:'UPDATE_FILTER', 
      filter_type,
      sort_type: event.target.dataset.type
    })
    toggleDropdown()
	}
  //whenevr sorting of tickets change chnage the function values
  const [callable, setCallable] = useState(false)
  const fetchTickets = useCallback(async(pageno)=>{
    if(!callable) return
    if(all_fetched || !pageno) return
    console.log(pageno)
    try{
      const { data } = await axios.get(`/ticket/index`,{
        params:{
          page_no: pageno,
          order_by:sort_type}
      })
      dispatch({type:'OPEN_CLOSE_TICKETS', tickets: {...data}, replace: pageno === 1})
    }catch(event){
      console.log(event)
      dispatch({type: 'ALL_FETCHED', status: true})
      dispatch({type:'ERROR', error: event.response.data.message})
    }
  }, [sort_type, all_fetched, callable, dispatch])
  //whenevr function chnage due to its required parameters call it
  //so indirectly function will be called when ever ticket page no chnages and sor type changes
  //sort type like updates_at and created_at
	useEffect(() => {
    !callable && setCallable(true)
    fetchTickets(1)
  },[fetchTickets])


  useEffect(() => {
    // if(!callable) return            
    const open_pointer_index = (ticket_page-1)*ticket_per_page//pointer at after which we have to start to fetch open tickets
    const no_of_open_tickets = open.length - open_pointer_index//no of open tickets we have to show
    const not_enough_open_ticket = no_of_open_tickets < ticket_per_page//do we have not have enough open tickets that we can fill our view
    if(!all_fetched && not_enough_open_ticket){
      //if all tickets are not fetched and we dont have enough open tickets to show then refetch
      console.log(open.length,close.length)
      const required_page = Math.floor((open.length+close.length)/tickets_per_request + 1)
      if(required_page) fetchTickets(required_page)
      return
    }
    
    // now we are here that means either we have fetched everything or we have enough open tickets to
    //in both cases we have make filter tickets with our present open tickets
    const end_index_open_ticket = open_pointer_index + ticket_per_page//end index of open tickets that we have to fetch
    let cur_open_tickets = open.slice(open_pointer_index, end_index_open_ticket)// fetch avaiolab and required open tickets  
    
    if( cur_open_tickets.length !== ticket_per_page && filter_type==='2'){
      //if we dont have enough open tickets to show on current page and we have to show all tickets(not just open)
      const closed_tickets_needed = ticket_per_page - cur_open_tickets.length// no of close ticket required to fill view
      const open_pages = Math.floor(open.length/ticket_per_page)//no of pqages filled with just open tickets
      const rem_pages = ticket_page - open_pages//rest pages after above
      const shared_close_tickets = ticket_per_page - open.length % ticket_per_page//no of closed tickets thaat are present on the page where open and close both ticket can be present
      let closed_pointer_index = 0
      if(no_of_open_tickets <= 0){
        closed_pointer_index = (rem_pages - 2)* ticket_per_page//calculation of start index of closed ticket
        closed_pointer_index += shared_close_tickets//and increasing it with no of closed tickets that was in shared page
      }

      const end_index_close_ticket = closed_pointer_index + closed_tickets_needed//end index of closed tickets
      cur_open_tickets = [...cur_open_tickets, ...close.slice(closed_pointer_index, end_index_close_ticket)]//merging closed and open tickets as per need
    }
    dispatch({
      type: 'CHANGE_FILTER_LIST',
      filter_list: cur_open_tickets
    })
  },[open, close, filter_type, ticket_page, all_fetched, ticket_per_page, tickets_per_request, dispatch, reload])

	return(
    <div className="tkt-header bg-primary-bv">
      <h2><strong>Issues</strong></h2>   
      <hr/>
      <div className='btn-group align-items-center'>
        <button 
            type='button' 
            data-status='1' 
            className={`btn btn-success border-end border-2${filter_type==='1'?' active':''}`} 
            onClick={changefilter}
        >
          Opened
        </button>

        <button 
          type='button' 
          data-status='2' 
          className={`btn btn-success border-start${filter_type==='2'?' active':''}`} 
          onClick={changefilter}
        >
          All
        </button>
      </div>
      <div className='btn-group dropdown mx-1'>
        <button type='button' className='btn btn-light dropdown-toggle' onClick={toggleDropdown}>
          Sort: <strong>{sort_type==='updated_at'?'Recently updated':'Newest'}</strong> 
        </button>
        {
        dropdown && 
        <ul className='dropdown-menu w-100 top-100 fa-padding' role='menu'>
          <li data-type='created_at' className='dropdown-item' onClick={sorting}><i className={`fa${sort_type === 'created_at'?' fa-check':''}`}></i> Newest</li>
          <li data-type='updated_at' className='dropdown-item' onClick={sorting}><i className={`fa${sort_type === 'updated_at'?' fa-check':''}`}> </i> Recently updated</li>
        </ul>
        }
      </div>
      <div className="nav-links float-end">
        <Link to='new'  className='btn bg-secondry-bv text-light'><strong>New Issue</strong></Link>
				{/* <Link to='/faq' className='btn bg-secondry-bv text-light'><strong>FAQs</strong></Link> */}
      </div>
      <div className='padding'></div>
    </div>
  );
}

export default Filter;
