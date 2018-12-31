import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import reducer from './reducers/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './Layout.css';
let store = createStore(reducer);

ReactDOM.render(
  <div className = {'wrapper'}>
    <div className={'container'}>
  <Provider store={store}>
    <TodoApp />
  </Provider>
</div>
</div>,
  document.getElementById('root'));
