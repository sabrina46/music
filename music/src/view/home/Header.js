import React from 'react';
import { Flex, SearchBar, Button } from 'antd-mobile';
import header from './header.module.scss';
import { switchMenu } from '../../store/action';
class Header extends React.Component {
  render() {
    return (
      <div className={header.content}>
        <Flex justify="center" align="center">
          <Flex.Item>
            <Button icon="check-circle-o" onClick="handleClick">
              搜索
            </Button>
            <SearchBar className="my-search" placeholder="Search" />
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
export default Header;
