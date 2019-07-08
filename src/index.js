import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import AppRouter from './App';
import { RESOURCE_API } from './config'
import reducers from './reducers'
import * as serviceWorker from './serviceWorker';

const options = {
  interceptors: {
      response: [
      {
          // args are { getState, dispatch, getSourceAction }, response
          success: (_, response) => response.data,
          // args are { getState, dispatch, getSourceAction }, error
          error: (_, error) => Promise.reject(error),
      },
      ],
  },
};

const client = axios.create({
  baseURL: RESOURCE_API,
  responseType: 'json',
});

const store = createStore(reducers, {}, applyMiddleware(axiosMiddleware(client, options)));
ReactDOM.render(	
    <Provider store = {store}>
        <AppRouter />
    </Provider>,
     document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
