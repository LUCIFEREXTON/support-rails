import { formatDate } from '../../helperFunction.js'
import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";

const ListItem = ({id, status, subject, createdAt, updatedAt}) => {
  const dispatch = useDispatch()
  let statusValue = ''
  if( status === 5 ){
    statusValue =  <span className='label label-danger pull-right'>Closed</span>
  }else{
    statusValue =  <span className='label label-success pull-right'>Open</span> 
  }
  
  const fetchConversation = () => {
    axios.get(`/tickets/${id}/conversations`)
    .then(res => dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...res.data]}))
    .catch(error => console.log(error));
  }

  
  const handleClick = () => {
    (
      async () => {
        try {
          const res = await axios.get(`/tickets/${id}`)
          dispatch({type:'SAVE_TICKET', ticket: {...res.data}})
        } catch (error) {
          console.log(error)
        }
      }
    )()
    fetchConversation();
  }

  return(
    <li className='list-group-item' data-toggle="modal" data-target="#viewTicketModal" onClick={handleClick}>
      <div className='media'>
        <i className='fa fa-cog pull-left'></i>
        <div className='media-body tkt-text'>
          <strong>{subject}</strong>  <span className='number'>#{id}</span> {statusValue}
						<p className='info'><small>Raised On: {formatDate(new Date(createdAt))} | Updated At: {formatDate(new Date(updatedAt))}</small></p>
        </div>
      </div>
    </li>
  );
}

export default ListItem;
