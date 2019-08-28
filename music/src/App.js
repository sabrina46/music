import React from 'react';
import './App.scss';
import Header from './view/home/Header.js';
import Recommend from './view/home/Recommend.js';
import AppList from './view/home/AppList.js';

import './assets/css/antd.scss';
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header className="app-header" />
        <Recommend className="app-recommend" />
        <AppList className="app-list" />
      </div>
    );
  }
}

export default App;
