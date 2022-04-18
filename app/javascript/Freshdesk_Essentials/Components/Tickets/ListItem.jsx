import { formatDate } from '../../helperFunction.js'
import React from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link} from 'react-router-dom';

const ListItem = ({id, user_id, status, subject, createdAt, updatedAt}) => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  // const pathname = useLocation().pathname
  let statusValue = ''
  if( status === 5 ){
    statusValue =  <span className="badge bg-danger float-end">Closed</span>
  }else{
    statusValue =  <span className="badge bg-success float-end">Open</span> }
  
  const handleClick = () => {
    navigate(`view/${user_id}/${id}`)
	}

  return(
    <li className='list-group-item' onClick={handleClick}>
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
