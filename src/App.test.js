import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(    
  <Provider store = {createStore(reducers)}>
    <AppRouter />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
