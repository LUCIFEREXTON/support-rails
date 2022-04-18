import axios from "axios";
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom'
import ConversationGroup from "../Components/Tickets/ConversationGroup";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';

const Ticket = () => {
  const navigate = useNavigate()
  const [openreply, setopenreply] = useState(false)
  const [ticket, setticket] = useState({})
  const [conversationList, setConversationList] = useState([])
  const { user_id, id } = useParams()
  const [files, changeFiles] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const formRef = useRef();
  const fileUploadRef = useRef();
  const dispatch = useDispatch()
  let statusValue = ''
  let statusChangeButton = ''
  
  if( ticket?.status === 5 ){
    statusValue =  <span className="badge bg-red align-self-center">Status Closed</span> 
    statusChangeButton =  <div className="btn bg-secondry-bv text-light" onClick={() => statusChangeHandler(2)}><strong>Reopen Ticket</strong></div>
  }else{
    statusValue =  <span className="badge bg-green align-self-center">Status Open</span>
    statusChangeButton =  <div className="btn bg-secondry-bv text-light" onClick={() => statusChangeHandler(5)}><strong>Ticket Resolve</strong></div>
  }

  const statusChangeHandler = async(status) => {
    try{
			const res = await axios.put(`/ticket/update/${id}`, { status })
      setticket({...res.data})
      dispatch({type:'UPDATE_STATUS', ticket: {...res.data}})
    }catch(error){
      dispatch({type:'ERROR', error: error.response.data.message})
    }
  }

  const onReplySubmit = () => {
    if(editorState.getCurrentContent().getPlainText()!==''){
      let formData = new FormData();
      formData.append( "body", draftToHtml(convertToRaw(editorState.getCurrentContent())));
      formData.append("agent_id", ticket.responder_id);
      formData.append("user_id", ticket.requester_id);
      files.forEach(file => formData.append("attachments[]",file));
			axios.post(`/ticket/reply/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        dispatch({type:'UPDATE_CONVERSATIONS', conversationList: [...conversationList, res.data]})
        setopenreply(false)
        setEditorState(() => EditorState.createEmpty())
        changeFiles([])
        formRef.current.reset()
      })
      .catch(error=>{
        dispatch({type:'ERROR', error: error.response.data.message})
      })
    }
  }

  const onFilesChange = event => {
    changeFiles([...files, ...event.target.files]);
    formRef.current.reset();
  }

  const removeSelectedFile = (fileName) => {
    changeFiles([...files.filter(file => file.name !== fileName)]);
  }
  
  useEffect(() =>{
    (
      async () => {
        try {
          const res = await axios.post(`/ticket/read`,{ user_id, id})
          const { conversationList, ...ticket} = res.data
          setticket({...ticket})
          setConversationList([...conversationList])
        } catch (error) {
          dispatch({type:'ERROR', error: error.response.data.message})
        }
      }
    )()
  }, [])

  return(
    <div id='viewTicket'>
      <div className="modal-header bg-primary-bv text-light">
      <i onClick={()=>navigate(-1)} className="display-5 rounded-circle lh-1 bi bi-arrow-left-circle bg-success text-primary"></i>
        <div className="d-flex">
          <h4 className="modal-title me-2">{ticket?.subject} [#{ticket?.id}]</h4>
          {statusValue}
        </div>
        <div>
          {(ticket?.status === 5)
          ?<div className="btn bg-secondry-bv text-light" onClick={() => statusChangeHandler(2)}><strong>Reopen Ticket</strong></div>
          :<div className="btn bg-secondry-bv text-light" onClick={() => statusChangeHandler(5)}><strong>Ticket Resolve</strong></div>}
        </div>
      </div>
      <div className='modal-body'>
        {ticket?.id && <ConversationGroup user_id={ticket?.requester_id} conversationList={[ticket, ...conversationList]} />}
        {!openreply && <div className="reply">
          <div 
            className="replybtn bg-secondry-bv text-light" 
            onClick={()=>{
              setopenreply(!openreply)
              setEditorState(() => EditorState.createEmpty())
              changeFiles([])
              formRef.current.reset()
              }}
            >
              <span className='fa fa-reply'></span> &nbsp;Reply
            </div>
        </div>}
      </div>
      {openreply && <div className="reply-modal">
        <div className="close-reply" onClick={()=>{
              setopenreply(!openreply)
              setEditorState(() => EditorState.createEmpty())
              changeFiles([])
              formRef.current.reset()
              }}>X</div>
        <div className="form-group">
          <Editor
            name="description"
            className="form-control"
            placeholder="Please detail your issue or question"
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div>          
        <form ref={formRef}>
            <div className="mb-3 form-group">
              {
                files?.length  !== 0 && <div name="attachements" className="form-control attachment-container">
                  {
                    files.map((file, ind) => (
                      <div className="attachment-selected" key={ind}>
                        <>{file.name}</>
                        <button type="button" className="file-remove-btn" onClick={() => removeSelectedFile(`${file.name}`)}>x</button>
                      </div>
                    ))
                  }
                </div>
              }
              <button type="button" className="btn btn-primary" onClick={(event) => fileUploadRef.current.click()}>Upload Attachments</button>
              <input 
                type="file"
                ref={fileUploadRef}  
                multiple
                onChange={onFilesChange}
                style={{"display": "none"}} 
              />
            </div>
          </form>
          <button type="submit" className="btn btn-primary text-left btn-reply" onClick={onReplySubmit}>Reply</button>
      </div>}
    </div>
  );
}

export default Ticket;
