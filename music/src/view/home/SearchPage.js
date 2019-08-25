import React from 'react';
import searchPage from './SearchPage.module.scss';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className={searchPage.content}></div>;
  }
}

export default SearchPage;
