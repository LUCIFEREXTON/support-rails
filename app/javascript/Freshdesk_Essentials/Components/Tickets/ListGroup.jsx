import ListItem from './ListItem'
import React from 'react'
import Spinner from '../Spinner'
import { useSelector }from 'react-redux'

const ListGroup = ()=>{
  const filter_list = useSelector(state => state.filter_list)
  return (
    <ul className='list-group fa-padding'>
      {filter_list ? filter_list.map(ticket=>(
        <ListItem 
          key={ticket.id} 
          id={ticket.id} 
					user_id={ticket.requester_id}
          subject={ticket.subject} 
          status={ticket.status} 
          createdAt={ticket.created_at} 
          updatedAt={ticket.updated_at}
        />
      ))
      :<Spinner />
      }
    </ul>
  )
}


export default ListGroup;
