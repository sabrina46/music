import React from 'react';
import styles from './listItem.module.scss';
import { Flex } from 'antd-mobile';
class ListItem extends React.Component {
  render() {
    return (
      <Flex className={styles.item}>
        <span className={styles.sort}>1</span>
        <img className={styles.img} src={this.props.list.img} alt="app" />
        <div className={styles.recommend}>
          <span className={styles.name}>{this.props.list.title}</span>
          <span className={styles.info}>{this.props.list.desc}</span>
          <span className={styles.rate}><i className="iconfont icon-pingfen1"></i></span>
        </div>
      </Flex>
    );
  }
}
export default ListItem;
