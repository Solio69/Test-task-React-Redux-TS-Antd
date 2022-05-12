import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { setUpStore } from './store/store';
import App from './app/App';
import './styles/index.scss';

const store = setUpStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

