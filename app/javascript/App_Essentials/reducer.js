const initialState = {
  user:{
      name: 'User',
      email:'contact10@freshdesk.com'
  },
  tickets: [],
  filterList: [],
  total: 0,
  opentickets: 0,
	closetickets: 0,
	selectedTicketId: null,
  conversationList: [],
  folderList: [],
  articles: [],
  filterArticles: [],
  article: {},
  ticketPage: 1,
  allfetched:false,
  ticket_per_page: 14,
  ticket: {}
}

const ticket_open_status = [2, 3, 4]

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE_NUMBER':{
      return {
        ...state,
        ticketPage: action.page
      }
    }
    case 'ALL_FETCHED':{
      return {
        ...state,
        allfetched: action.status
      }
    }
    case 'UPDATE_TICKETS':{
      let open = 0 
      const total = action.tickets.reduce((total, ticket)=>{
        if(ticket_open_status.includes( ticket.status )) 
          open++;
        return total + 1
      }, 0)
      return {
        ...state,
        total,
        tickets : [...action.tickets],
        filterList: [...action.tickets],
        opentickets: open
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
        filterList: [action.ticket, ...state.filterList],
        opentickets: state.opentickets + 1,
        total: state.total + 1,
      }
    }
    case 'UPDATE_STATUS':{
      if( action.ticket.status === 5){
        return {
          ...state,
          ticket: {...action.ticket},
          tickets: [action.ticket, ...state.tickets.filter(ticket => ticket.id !== action.ticket.id)],
          filterList: [...state.filterList.filter(ticket => ticket.id !== action.ticket.id)],
          opentickets: state.opentickets - 1
        }
      }
      return {
        ...state,
        tickets: [action.ticket, ...state.tickets.filter(ticket => ticket.id !== action.ticket.id)],
        filterList: [action.ticket, ...state.filterList.filter(ticket => ticket.id !== action.ticket.id)],
        opentickets: state.opentickets + 1
      }
    }
    case 'CHANGE_FILTER_LIST':{
      return {
        ...state,
        filterList: action.filterList
      }
    }
    case 'SHOW_TICKET':{
      return {
        ...state,
        selectedTicketId : action.id
      }
    }
    case 'UPDATE_CONVERSATIONS':{
      return {
        ...state,
        conversationList: action.conversationList
      }
    }
    case 'INSERT_CATEGORY':{
      if(state.folderList.includes(action.folderId))
        return state
      return {
        ...state,
        folderList: [...state.folderList, action.folderId]
      }
    }
    case 'REMOVE_CATEGORY':{
      return {
        ...state,
        folderList: state.folderList.filter(folderId=>folderId!==action.folderId)
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
        filterArticles: [...action.filterArticles]
      }
    }
    case 'EMPTY_FILTER_ARTICLES':{
      return {
        ...state,
        filterArticles: []
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
