import React from 'react';
import ListItem from '../components/ListItem';
import { ListView } from 'antd-mobile';
import styles from './recommendation.module.scss';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

const pageSize = 10;
class Recommendation extends React.Component {
  static propTypes = {
    keyword: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      dataSource,
      isLoading: true,
      pageIndex: 1,
      appList: [],
      dataArr: [],
      keyword: ''
    };
  }
  getList() {
    let pageIndex = this.state.pageIndex;
    let that = this;
    fetch('../data/recomendData.json', {
      method: 'get',
      dataType: 'json'
    })
      .then(res => res.json())
      .then(res => {
        let data = res.feed.entry.slice(pageIndex === 0 ? 0 : (pageIndex - 1) * pageSize, pageIndex * pageSize).map((item, i) => {
          return {
            img: item['im:image'][0]['label'],
            title: item.title.label,
            category: item.category.attributes.label,
            rate: i,
            sort: i + 1 + (pageIndex - 1) * pageSize
          };
        });

        //这里表示上拉加载更多
        let rdata = [...that.state.appList, ...data];
        that.setState({
          appList: rdata,
          dataSource: that.state.dataSource.cloneWithRows(rdata),
          isLoading: data.length !== 0
        });
      })
      .catch(e => console.log('错误:', e));
  }
  componentDidMount() {
    this.getList();
  }
  onRefresh = () => {
    let that = this;
    this.setState({ isLoading: true, pageIndex: 1 });
    setTimeout(() => {
      that.getList();
    }, 2000);
  };
  onEndReached = event => {
    if (!this.state.isLoading) {
      return;
    }
    this.setState({ pageIndex: this.state.pageIndex + 1 });
    let that = this;
    setTimeout(() => {
      that.getList();
    }, 1000);
  };
  render() {
    let data = this.state.appList;
    if(data.length === 0) return (<div className={styles.empty}>暂无数据</div>);
    let index = data.length < pageSize ? 0 : data.length - pageSize;
    const row = (rowData, sectionID, rowID) => {
      const obj = data[index++];
      if(!obj) return ''
      return (
        <div className={styles.content}>
          <ListItem list={obj} key={rowID}></ListItem>
        </div>
      );
    };
    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderFooter={() => <div style={{ padding: 10, textAlign: 'center' }}>{this.state.isLoading ? '加载中...' : '加载完成'}</div>}
        renderRow={row}
        useBodyScroll={true}
        pageSize={4}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    keyword: state.keyword
  };
};
export default connect(mapStateToProps)(Recommendation);
