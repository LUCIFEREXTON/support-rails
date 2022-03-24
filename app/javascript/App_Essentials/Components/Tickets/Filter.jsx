import { useState, useEffect } from "react";
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'


const Filter = () =>{
  const [filteredtickets, setfilteredtickets] = useState([]);
  const [filterStatus, setFilterStatus] = useState('2');
  const [selectedtype, setselectedtype] = useState('Recently updated')
  const [dropdown, setdropdown] = useState(false)
  const dispatch = useDispatch()
  
  const toggleDropdown = () => setdropdown(!dropdown)

  const { tickets, filtered, opentickets, total } = useSelector( state => {
    return {
      tickets: [...state.tickets],
      filtered: [...state.filterList],
      opentickets: state.opentickets, 
      total: state.total
    }
  })

  const changefilter = e => {
		if (e.target.dataset.status === filterStatus){
			return
		}
    if (filterStatus === '2'){
      setfilteredtickets([...tickets.filter(ticket => ticket.status!==5)])
    }else{
			setfilteredtickets([...tickets])
    }
		setFilterStatus(e.target.dataset.status)
  }

	const sorting = (e) => {
    if( e.target.dataset.type === selectedtype ){ 
      toggleDropdown()
      return
    }
    switch(e.target.dataset.type){
      case 'Newest':{
        setselectedtype('Newest')
        filtered.sort((a, b)=> new Date(b.created_at) - new Date(a.created_at))
        setfilteredtickets([...filtered])
        break
      }
      case 'Recently updated':{
        setselectedtype('Recently updated')
        filtered.sort((a, b)=> new Date(b.updated_at) - new Date(a.updated_at))
        setfilteredtickets([...filtered])
        break
      }
      default: break
    }
    toggleDropdown()
	}

	useEffect(() => {
    dispatch({
      type:'CHANGE_FILTER_LIST', 
      filterList: filteredtickets
    })
  }, [filteredtickets])

  useEffect(()=>{
    setfilteredtickets([...tickets])
  },[])
	
	return(
    <div className="tkt-header bg-primary-bv">
      <h2><strong>Issues</strong></h2>   
      <hr/>
      <div className='btn-group'>
        <button 
            type='button' 
            data-status='1' 
            className={`btn btn-default${filterStatus==='1'?' active':''}`} 
            onClick={changefilter}
        >
          {parseInt(opentickets)} Opened
        </button>

        <button 
          type='button' 
          data-status='2' 
          className={`btn btn-default${filterStatus==='2'?' active':''}`} 
          onClick={changefilter}
        >
          {parseInt(total)} All
        </button>
      </div>
      <div className='btn-group'>
        <button type='button' className='btn btn-default dropdown-toggle' onClick={toggleDropdown}>
          Sort: <strong>{selectedtype}</strong> <span className='caret'></span>
        </button>
        {
        dropdown && 
        <ul className='dropdown-menu fa-padding' role='menu'>
          <li data-type='Newest' className='filter-item' onClick={sorting}><i className={`fa${selectedtype === 'Newest'?' fa-check':''}`}></i> Newest</li>
          <li data-type='Recently updated' className='filter-item' onClick={sorting}><i className={`fa${selectedtype === 'Recently updated'?' fa-check':''}`}> </i> Recently updated</li>
        </ul>
        }
      </div>
      <div className="nav-links pull-right">
        <div data-toggle='modal' data-target="#newTicketModal" className='btn bg-secondry-bv text-light'><strong>New Issue</strong></div>
				{/* <Link to='/faq' className='btn bg-secondry-bv text-light'><strong>FAQs</strong></Link> */}
      </div>
      <div className='padding'></div>
    </div>
  );
}

export default Filter;
