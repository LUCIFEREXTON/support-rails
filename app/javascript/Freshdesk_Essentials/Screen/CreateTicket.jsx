import { useState, useRef, useEffect } from "react";
import React from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';

const CreateTicket = () =>{
  const [subject, changeSubject] = useState('');
  const [files, changeFiles] = useState([]);
  const [blogURI, changeBlogURI] = useState([]);
  const [urilist, seturilist] = useState([])
  const [filteredURI, changefilteredURIList] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const formRef = useRef();
  const fileUploadRef = useRef();
  const containerRef = useRef();
  const inputURIRef = useRef();
	const dispatch = useDispatch()
  const onSubjectChange = event => {
    changeSubject(event.target.value);
  }

  const onFilesChange = event => {
    changeFiles([...files, ...event.target.files]);
    formRef.current.reset();
  }

  const toggleDropdown = () => setDropdown(!dropdown);

  const initialValue = () => {
    changeSubject('');
    setEditorState(() => EditorState.createEmpty())
    changeFiles([]);
    changeBlogURI([]);
    formRef.current.reset();
  }

  const onTicketCreate = () => {
		if(subject && subject !== '' && editorState.getCurrentContent().getPlainText()!==''){
			let formData = new FormData();
    formData.append( "subject", subject);
    formData.append("description", draftToHtml(convertToRaw(editorState.getCurrentContent())));
    formData.append("custom_fields[cf_blog_uri]", blogURI.join("\n"));
    files.forEach(file => formData.append("attachments[]",file));
		axios.post(`/ticket/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        dispatch({type:'CREATE_TICKET', ticket: res.data})
				initialValue();
      })
      .catch(error=>{
        dispatch({type:'ERROR', error: error.response.data.message})
      })

		}
	}
  const createClickhandler = () =>{
    onTicketCreate();
  }
  const changeURIFilter = (inputText) => {
    let filteruri = [...urilist.filter(uri => uri.includes(inputText))];
    filteruri = filteruri.filter(uri => !blogURI.includes(uri));
    changefilteredURIList([...filteruri.slice(0, Math.min(filteruri.length, 5))]);
  }
  const addContentToBlogDiv = (event) => {
    changeBlogURI([...blogURI,event.target.dataset.type]);
    toggleDropdown();
    resetURIInputField();
  }
  const removeSelectedURI = (uri) => {
    changeBlogURI([...blogURI.filter(bloguri => bloguri !== uri)]);
  }
  const changeDropdownList = (event) => {
    changeURIFilter(event.target.value.toLowerCase());
  }
  const resetURIInputField = () => {
    inputURIRef.current.value = "";
  }
  const removeSelectedFile = (fileName) => {
    changeFiles([...files.filter(file => file.name !== fileName)]);
  }

	useEffect(()=>{
		(async()=>{
			try{
				const res = await axios.get('/ticket/blog_uri_list')
				seturilist([...res.data.blog_uri_list])
				changefilteredURIList([...res.data.blog_uri_list].slice(0,Math.min(res.data.blog_uri_list.length,5)))
			}catch(error){
        dispatch({type:'ERROR', error: error.response.data.message})
      }
		})()
	},[dispatch])

  return(
    <div
      className="modal-dialog modal-dialog-centered"
      onClick={(event) => {
        if(containerRef.current && !containerRef.current.contains(event.target)) { 
        setDropdown(false);
      }
    }}>
      <div className='modal-header bg-primary-bv text-light pos-rel new-ticket-header'>
        <h4 className='modal-title'><i className='fa fa-pencil'></i> Create New Issue</h4>
      </div>
      <div className='modal-body'>
          <div className='form-group'>
            <input name='subject' type='text' className='form-control' placeholder='Subject' value={subject} onChange={onSubjectChange}/>
          </div>
          <div className="form-group" ref={containerRef}>
            <div name="blog_uri" className="form-control bloguri-container">
              {
                blogURI.map((uri, ind) => (
                  <div className="blog-uri uri-selected" key={ind}>
                    <div>{uri}</div>
                    <button type="button" className="uri-remove-btn" onClick={() => { removeSelectedURI(`${uri}`); setDropdown(false);}}>x</button>
                  </div>
                ))
              }
              <div className="blog-uri bloguri-input-div">
                <input 
                  type="text"
                  className="bloguri-input"
                  placeholder="Enter blog url"
                  ref={inputURIRef}
                  onChange={changeDropdownList}
                  onClick={() => { toggleDropdown(); changeURIFilter('');}} 
                  onKeyDown={(event) =>  { 
                    if (event.key === 'Enter') 
                    { 
                      changeBlogURI([...blogURI,event.target.value]); 
                      resetURIInputField(); 
                      toggleDropdown();
                    
                    } else
                    setDropdown(true);
                  }}
                />
              </div>
            </div>
            {
              dropdown && 
              <ul className='dropdown-menu fa-padding uri-dropdown' role='menu'>
                {
                  filteredURI.map((uri, ind) => (
                    <li data-type={`${uri}`} className='filter-item' key={ind} onClick={addContentToBlogDiv}>{uri}</li>
                  ))
                }
              </ul>
            }
          </div>
          <div className="form-group">
            <Editor
              name="description"
              className="form-control"
              placeholder="Please detail your issue or question"
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
            {/* <textarea name="description" className="form-control" value={description} placeholder="Please detail your issue or question" style={{height: '120px'}} onChange={onDescriptionChange}/> */}
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
      </div>
      <div className='modal-footer' style={{"textAlign": "center"}}> 
        <button type='button' className='btn btn-lg btn-default' data-dismiss='modal' onClick={initialValue}> Reset</button>
        <button type='submit' className='btn btn-lg bg-secondry-bv text-light' onClick={createClickhandler} data-dismiss='modal'> Create</button>
      </div>
    </div>
  );
}

export default CreateTicket;
