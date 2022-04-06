import axios from "axios"
import React from 'react'
import { useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
const Pagination = ()=>{
  const dispatch = useDispatch()
  const page = useSelector(state => state.ticketPage)
  const allfetched = useSelector( state => state.allfetched)
  const ticket_per_page = useSelector( state => state.ticket_per_page)
  
	const next = async()=>{
    if( allfetched ) return
		dispatch({type: 'UPDATE_PAGE_NUMBER', page: page+1})
	}
  const prev = async() =>{
    if( page===1 ) return
		dispatch({type: 'UPDATE_PAGE_NUMBER', page: page-1})
		if(allfetched){
			dispatch({type: 'ALL_FETCHED', status: false})
		}
  }
	
  useEffect(() => {
    (async()=>{
      try{
        const { data } = await axios.get(`/ticket/index/${ticket_per_page}/${page}`)
        dispatch({type:'UPDATE_TICKETS', tickets: [...data]})
        if(data.length < ticket_per_page){
          dispatch({type: 'ALL_FETCHED', status: true})
        }
      }catch(e){
        console.log(e)
				dispatch({type: 'ALL_FETCHED', status: true})
				dispatch({type:'ERROR', error: e.response.data.message})
      }
    })()
  },[page, ticket_per_page])

  return(
    <div className="page">
      <div className={`pagebtn${page===1?' disabled':''}`} onClick={prev}>{'<<'}</div>
      <div className="pagebtn curr">{allfetched?'Last Page':`Page ${page}`}</div>
      <div className={`pagebtn${allfetched?' disabled':''}`} onClick={next}>{'>>'}</div>
    </div>
  )
}
export default Pagination
