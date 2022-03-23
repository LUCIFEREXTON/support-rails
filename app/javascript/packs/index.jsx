// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import '../App_Essentials/index.css';
import App from '../App_Essentials/App';
import reportWebVitals from '../App_Essentials/reportWebVitals';
//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../App_Essentials/reducer';
import axios from 'axios';
import { composeWithDevTools } from "redux-devtools-extension";
axios.defaults.baseURL = "https://utkarsh-help.freshdesk.com/api/v2";
axios.defaults.headers.common['Authorization'] = "Basic VmRtUmM2dnVJSEpRUWlEa1pkN1g6WA=="
const store = createStore(reducer, composeWithDevTools());

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
	document.body.appendChild(document.createElement('div')),
)})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
