import { nicesize } from '../../helperFunction'
import React from 'react'
const Attachment = ({file}) =>{
  const type = file.name.split('.').pop()
  return(
    <div className="attachment">
      <div className='attachwrapper'>
        <div  className="attachicon">
          <i className={`bi bi-filetype-${type}`}></i>
        </div>
        <div className="filedetails">
          <div className="filename">                  
            <a href={file.attachment_url} rel="noreferrer" target="_blank">{file.name}</a>
          </div>
          <div className="size">
            {nicesize(file.size)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attachment

// attachment_url: "https://s3.ap-south-1.amazonaws.com/ind-cdn.freshdesk.com/data/helpdesk/attachments/production/84002468727/original/Screenshot%20from%202022-03-02%2015-45-17.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS6FNSMY2XLZULJPI%2F20220314%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220314T112249Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=08053ee4836ae43bbd94f215278eee9d093afc5ebe6444c84ddea5bbb8fab05f"
// content_type: "image/png"
// created_at: "2022-03-14T10:53:56Z"
// id: 84002468727
// name: "Screenshot from 2022-03-02 15-45-17.png"
// size: 105761
// updated_at: "2022-03-14T10:53:56Z"
