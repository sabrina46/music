import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './assets/font/iconfont.css';
import App from './App.js';
import Detail from './view/recommendation';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route path="/" exact component={App}></Route>
      <Route path="/detail" component={Detail}></Route>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
