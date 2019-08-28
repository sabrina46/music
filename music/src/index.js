import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './assets/font/iconfont.css';
import './assets/css/common.scss';
import App from './App.js';
import Detail from './view/Recommendation';
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
serviceWorker.unregister();
