import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
const Pagination = ()=>{
  const dispatch = useDispatch()
  const page = useSelector(state => state.ticket_page)
  const all_showed = useSelector( state => state.all_showed)
  
	const next = async()=>{
    if( all_showed ) return
		dispatch({type: 'UPDATE_PAGE_NUMBER', page: page+1})
	}
  const prev = async() =>{
    if( page===1 ) return
		dispatch({type: 'UPDATE_PAGE_NUMBER', page: page-1})
		if(all_showed){
			dispatch({type: 'ALL_SHOWED', status: false})
		}
  }

  return(
    <div className="page">
      <div className={`pagebtn${page===1?' disabled':''}`} onClick={prev}>{'<<'}</div>
      <div className="pagebtn curr">{all_showed?'Last Page':`Page ${page}`}</div>
      <div className={`pagebtn${all_showed?' disabled':''}`} onClick={next}>{'>>'}</div>
    </div>
  )
}
export default Pagination
