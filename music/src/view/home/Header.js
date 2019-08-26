import React from 'react';
import { Flex, SearchBar } from 'antd-mobile';
import header from './header.module.scss';
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { actionTypes,createAction } from '../../store/action';
class Header extends React.Component {
  static propTypes = {
    getAppList: PropTypes.func.isRequired,
    appList: PropTypes.array.isRequired
  }
  constructor (props){
    super(props)
    this.state = {
      isSearch: false,
      isLoading: false,
      searchList: [],
      keyword: '',
      total: 0
    }
  }
  getData(){
    fetch('../data/lookUp.json')
    .then(res => res.json())
    .then(res => {
      let data = res.results.map(item => {
       let category =  item.genres.length > 1 ?  item.genres.splice(0,2).join('和'):item.genres[0]
        return {
          img: item.screenshotUrls[0],
          title: item.trackName,
          category:category,
        };
      });
      this.setState({ searchList: data });
      this.props.getAppList(data)
    })
    .catch(e =>
       this.clearList()
    );
  }
  search = (isEmpty) => {
    let len = this.state.searchList.length
    if ((this.state.total === len && len > 0) || this.state.isLoading) {
      return
    }
    this.setState({
      isLoading: true
    }, () => {
      this.getData()
    })
  }
  clearList = () => {
    this.props.getAppList([])
  }
  handleChange = (value) => {
      if (value) {
        this.setState({
          keyword: value,
          isLoading: false,
          total: 0,
          appList: []
        }, () => this.search(true))
      } else {
        this.setState({
          keyword: value,
          isLoading: false,
          isSearch: false,
          total: 0,
          appList: []
        },() =>  this.clearList)
      }
  }
  render() {
    return (
      <div className={header.content}>
        <Flex justify="center" align="center">
          <Flex.Item>
            <SearchBar className="my-search" placeholder="Search" value={this.state.keyword} onChange={this.handleChange} onCancel={this.clearList} onClear={this.clearList}/>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    appList: state.appList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppList: list => {
      dispatch(createAction(actionTypes.GET_APP_LIST, list))
    }
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Header);
