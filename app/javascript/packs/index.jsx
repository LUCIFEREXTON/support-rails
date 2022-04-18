// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import '../Freshdesk_Essentials/index.css';
import App from '../Freshdesk_Essentials/App';
import reportWebVitals from '../Freshdesk_Essentials/reportWebVitals';
//bootstrap
import '../Freshdesk_Essentials/custom_bootstrap.scss'
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../Freshdesk_Essentials/reducer';
import axios from 'axios';
import { composeWithDevTools } from "redux-devtools-extension";
const token = document.querySelector('[name=csrf-token]').content;
axios.defaults.baseURL = "http://localhost:3000/api/v1/freshdesk";
axios.defaults.headers.common['X-CSRF-TOKEN'] = token
const store = createStore(reducer, composeWithDevTools());

document.addEventListener('turbolinks:load', () => {
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
