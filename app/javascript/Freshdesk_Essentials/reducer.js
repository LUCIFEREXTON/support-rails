const initialState = {
  tickets: [],
  filter_list: null,
  open: [],
  close: [],
  next_open: 0,
  next_close: 0,
  conversation_list: [],
  ticket: {},
  total: 0,
  ticket_page: 1,
  ticket_per_page: 10,
  tickets_per_request: 100,
	selected_ticketId: null,
  filter_type: '1',
  sort_type: 'updated_at',
  all_fetched:false,
  all_showed:false,
  errormsg: '',
  folder_list: [],
  articles: [],
  filter_articles: [],
  article: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_CLOSE_TICKETS':{
      const incoming_length = action.tickets.open.length+action.tickets.close.length
      const open = action.replace? [...action.tickets.open]:[...state.open, ...action.tickets.open]
      const close = action.replace? [...action.tickets.close]:[...state.close, ...action.tickets.close]
      return {
        ...state,
				open,
				close,
        total: open.length+close.length,
        all_fetched: incoming_length < state.tickets_per_request
      }
    }
    case 'SET_PER_PAGE':{
      return {
        ...state,
				ticket_per_page: action.per_page || 10,
        tickets_per_request: action.tickets_per_request || 100
      }
    }
    case 'ERROR':{
      return {
        ...state,
				errormsg: action.error || 'Can\'t Connect to Server' 
      }
    }
    case 'UPDATE_PAGE_NUMBER':{
      return {
        ...state,
        ticket_page: action.page
      }
    }
    case 'ALL_SHOWED':{
      return {
        ...state,
        all_showed: action.status
      }
    }
    case 'ALL_FETCHED':{
      return {
        ...state,
        all_fetched: action.status
      }
    }
    case 'UPDATE_FILTER':{
      if(state.filter_type!==action.filter_type){//if filter_type is changing
        return {
          ...state,
          filter_type: action.filter_type,
          ticket_page: 1,
          all_showed: false
        }
      }else{//if sort type is changing
        return {
          ...state,
          sort_type: action.sort_type,
          ticket_page: 1,
          all_fetched: false,
          all_showed: false
        }
      }
    }
    case 'SAVE_TICKET':{
      return {
        ...state,
        ticket: {...action.ticket}
      }
    }
    case 'CREATE_TICKET':{
      return {
        ...state,
        tickets : [action.ticket, ...state.tickets],
        filter_list: [action.ticket, ...state.filter_list],
        total: state.total + 1
      }
    }
    case 'UPDATE_STATUS':{
      let open, close
      if(action.ticket.status===5){
        open = [...state.open.filter(ticket=> ticket.id !== action.ticket.id)]
        close = [action.ticket, ...state.close]
        if(state.sort_type === 'created_at'){
          close.sort((ticket1, ticket2) => new Date(ticket2).created_at - new Date(ticket1).created_at)
        }else{
          close.sort((ticket1, ticket2) => new Date(ticket2).updated_at - new Date(ticket1).updated_at)
        }
      }else{
        close = [...state.close.filter(ticket=> ticket.id !== action.ticket.id)]
        open = [action.ticket, ...state.open]
        if(state.sort_type === 'created_at'){
          open.sort((ticket1, ticket2) => new Date(ticket2).created_at - new Date(ticket1).created_at)
        }else{
          open.sort((ticket1, ticket2) => new Date(ticket2).updated_at - new Date(ticket1).updated_at)
        }
      }
      return{
        ...state,
        open,
        close
      }
    }
    case 'CHANGE_FILTER_LIST':{
      return {
        ...state,
        filter_list: action.filter_list,
        all_showed: action.filter_list.length < state.ticket_per_page
      }
    }
    case 'SHOW_TICKET':{
      return {
        ...state,
        selected_ticketId : action.id
      }
    }
    case 'UPDATE_CONVERSATIONS':{
      return {
        ...state,
        conversation_list: action.conversation_list
      }
    }
    case 'INSERT_CATEGORY':{
      if(state.folder_list.includes(action.folderId))
        return state
      return {
        ...state,
        folderList: [...state.folder_list, action.folderId]
      }
    }
    case 'REMOVE_CATEGORY':{
      return {
        ...state,
        folderList: state.folder_list.filter(folderId=>folderId!==action.folderId)
      }
    }
    case 'UPDATE_ARTICLES':{
      return {
        ...state,
        articles: [...state.articles, ...action.articles]
      }
    }
    case 'UPDATE_FILTER_ARTICLES':{
      return {
        ...state,
        filter_articles: [...action.filter_articles]
      }
    }
    case 'EMPTY_FILTER_ARTICLES':{
      return {
        ...state,
        filter_articles: []
      }
    }
    case 'STORE_ARTICLE':{
      return {
        ...state,
        article: {...action.article}
      }
    }
    default:
      return state
  }
}

export default reducer
