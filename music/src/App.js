import React from 'react';
// import logo from './logo.svg';
import './App.scss';
// import { route } from 'react-router-dom';
import Header from './view/home/Header.js';
import Recommend from './view/home/Recommend.js';
import AppList from './view/home/AppList.js';
import SearchPage from './view/home/SearchPage.js';

import './assets/css/antd.scss';
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header className="app-header" />
        <Recommend className="app-recommend" />
        <AppList className="app-list" />
        <SearchPage />
      </div>
    );
  }
}

export default App;
