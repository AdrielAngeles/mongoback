import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import accountReducer from "./accountReducer";


ReactDOM.render(
<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
serviceWorker.unregister();


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  plaid: accountReducer
});