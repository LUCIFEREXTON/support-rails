import ConversationItem from './ConversationItem'
import React from 'react'

const ConversationGroup = ({ user_id, conversationList })=>{
  return (
    <div className='support-content-comment overflow-auto'>
        {conversationList.map(conversation=>(
            <ConversationItem 
              key={conversation.id}
              source = {user_id ===conversation.user_id || user_id === conversation.requester_id}
              conversation={conversation}
            />
        )).reverse()}    
    </div>
  )
}





export default ConversationGroup;
