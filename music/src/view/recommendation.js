import React from 'react';
import ListItem from '../components/ListItem.js';
import ReactDOM from 'react-dom';
import { ListView } from 'antd-mobile';
import styles from './recommendation.module.scss';

const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = pIndex * NUM_SECTIONS + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}
class AppList extends React.Component {
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
      appList: [
        {
          img: '',
          title: '',
          desc: '',
          category: ''
        }
      ]
    };
  }
  componentDidMount() {
    this.getList();
  }
  getList() {
    fetch('../data/appListData.json')
      .then(res => res.json())
      .then(res => {
        console.log(res.feed);
        let data = res.feed.entry.map((item, i) => {
          return {
            img: item['im:image'][0]['label'],
            title: item.title.label,
            category: item.category.attributes.label,
            rate: i
          };
        });
        this.setState({ appList: data }, () => {
          const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
          setTimeout(() => {
            genData();
            this.setState({
              dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
              isLoading: false,
              height: hei
            });
          }, 600);
        });
      })
      .catch(e => console.log('错误:', e));
  }
  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false
      });
    }, 1000);
  };
  render() {
    let data = this.state.appList;
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div className={styles.content}>
          <ListItem list={obj} key={rowID} indx={pageIndex}></ListItem>
        </div>
      );
    };

    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource}
        renderRow={row}
        useBodyScroll={true}
        pageSize={4}
        onScroll={() => {
          console.log('scroll');
        }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
export default AppList;
