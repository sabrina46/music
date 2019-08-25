import React from 'react';
import { Flex, SearchBar } from 'antd-mobile';
import header from './header.module.scss';

class Header extends React.Component {
  render() {
    return (
      <div className={header.content}>
        <Flex justify="center" align="center">
          <Flex.Item>
            <SearchBar className="my-search" placeholder="Search"/>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
export default Header;
