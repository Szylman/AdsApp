import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store.js';

ReactDOM.render(
  <BrowserRouter>
    <Provider store= {store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root')
);