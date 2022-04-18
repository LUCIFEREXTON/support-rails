import { formatDate } from '../../helperFunction'
import React from 'react'
import parse from 'html-react-parser';
import Attachment from './Attachment'
import { useSelector } from 'react-redux'
const ConversationItem = ({source, conversation}) => {
  return(
    <div className={`conversation ${source?'user':'support'}`}>
			<div className="conv-header">
				<div className="iconbg">
					<div className="icon">
						{source?'You':'BV'}
					</div>
				</div>
				<div className="sender">
					<div className="responder">{source?'You':'Support'}</div>
					{conversation?.updated_at
					?<div className="date">Raised On: {formatDate(conversation?.created_at)} | Last Activity: {formatDate(conversation?.updated_at)}</div>
					:<div className="date">{formatDate(conversation?.created_at)}</div>}
				</div>
			</div>
			<div className="conv-mail">
				<div className='mail-icon'>
					<i className="fa fa-envelope-o" aria-hidden="true"></i>
				</div>
				<div className="mail-body">
					<div className="mail-text">
						{
							conversation?.description 
							? 
							(
								<>
									<div style={{"display": "flex"}}>
										{conversation?.custom_fields?.cf_blog_uri?.length 
										? <span style={{marginRight: "5px", fontWeight: "bold"}}>Links of the Blog that you shared with us are:</span>
										: <span></span>
										}
										{conversation?.custom_fields?.cf_blog_uri}
									</div>
									{parse(conversation?.description)}
								</>
							) 
							: parse(conversation?.body)
						}
					</div>
					{conversation?.attachments?.length > 0  &&
						<div className="all-attachments">
							{conversation?.attachments?.map( attachment => <Attachment key={attachment.id} file={attachment}/>)}
						</div>
					}
				</div>
			</div>
    </div>
  );
}

export default ConversationItem;
