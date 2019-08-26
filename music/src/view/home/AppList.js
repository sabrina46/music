import React from 'react';
import ListItem from '../../components/ListItem.js';
import { ListView } from 'antd-mobile';
import styles from './appList.module.scss';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import store from '../../store/store';

let pageSize = 5;
class AppList extends React.Component {
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
    fetch('../data/appListData.json', {
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
        console.log(pageIndex === 0 ? 0 : (pageIndex - 1) * pageSize);

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
  searchList() {
    if (!this.props.keyword) return;
    fetch('../data/lookUp.json', {
      method: 'get',
      dataType: 'json',
      body: { keyword: this.props.keyword }
    })
      .then(res => res.json())
      .then(res => {
        let data = res.results.map(item => {
          let category = item.genres.length > 1 ? item.genres.splice(0, 2).join('和') : item.genres[0];
          return {
            img: item.screenshotUrls[0],
            title: item.trackName,
            category: category
          };
        });
        this.setState({ searchList: data });
        // this.props.setKeyword(data)
      })
      .catch(e => this.clearList());
  }
  componentDidMount() {
    this.getList(true);
    store.subscribe(() => {
      let {
        common: { age: iptVal }
      } = store.getState();
      this.setState({ iptVal });
    });
  }
  onRefresh = () => {
    let that = this;
    this.setState({ refreshing: true, isLoading: true, pageIndex: 1 });
    setTimeout(() => {
      that.getList(true);
    }, 2000);
  };
  onEndReached = event => {
    if (!this.state.isLoading) {
      return;
    }
    this.setState({ pageIndex: this.state.pageIndex + 1 });
    let that = this;
    setTimeout(() => {
      that.getList(false);
    }, 1000);
  };
  render() {
    console.log(this.props.keyword, 'keyword');
    let data = this.state.appList;
    let index = data.length - 5;
    const row = (rowData, sectionID, rowID) => {
      const obj = data[index++];
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
        renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>{this.state.isLoading ? '加载中...' : '加载完成'}</div>}
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
export default connect(mapStateToProps)(AppList);
