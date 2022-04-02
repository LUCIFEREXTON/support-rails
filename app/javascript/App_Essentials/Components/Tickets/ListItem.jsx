import { formatDate } from '../../helperFunction.js'
import React from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";

const ListItem = ({id, user_id, status, subject, createdAt, updatedAt}) => {
  const dispatch = useDispatch()
  let statusValue = ''
  if( status === 5 ){
    statusValue =  <span class="badge bg-danger float-end">Success</span>
  }else{
    statusValue =  <span class="badge bg-success float-end">Success</span> }
  
  const fetchConversation = () => {
    axios.get(`/tickets/${id}/conversations`)
    .then(res => dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...res.data]}))
    .catch(error => console.log(error));
  }

  
  const handleClick = () => {
    (
      async () => {
        try {
					const res = await axios.post(`/ticket/read`,{ user_id, id})
					const { conversationList, ...ticket} = res.data
					dispatch({type:'SAVE_TICKET', ticket: {...ticket}})
					dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...conversationList]})
        } catch (error) {
          dispatch({type:'ERROR', error: error.response.data.message})
        }
      }
		)()
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
