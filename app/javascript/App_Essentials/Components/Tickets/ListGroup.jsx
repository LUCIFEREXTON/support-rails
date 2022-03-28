import ListItem from './ListItem'
import React from 'react'
import { useSelector }from 'react-redux'

const ListGroup = ()=>{
  const filterList = useSelector(state => state.filterList)
  return (
    <ul className='list-group fa-padding'>
      {filterList.map(ticket=>(
        <ListItem 
          key={ticket.id} 
          id={ticket.id} 
					user_id={ticket.requester_id}
          subject={ticket.subject} 
          status={ticket.status} 
          createdAt={ticket.created_at} 
          updatedAt={ticket.updated_at}
        />
      ))}
    </ul>
  )
}


export default ListGroup;
