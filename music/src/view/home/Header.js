import React from 'react';
import { Flex, SearchBar } from 'antd-mobile';
import header from './header.module.scss';
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { actionTypes,createAction } from '../../store/action';
class Header extends React.Component {
  static propTypes = {
    setKeyword: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired
  }
  constructor (props){
    super(props)
    this.state = {
      isLoading: false,
      keyword: '',
    }
  }
  // getData(){
  //   fetch('../data/lookUp.json')
  //   .then(res => res.json())
  //   .then(res => {
  //     let data = res.results.map(item => {
  //      let category =  item.genres.length > 1 ?  item.genres.splice(0,2).join('和'):item.genres[0]
  //       return {
  //         img: item.screenshotUrls[0],
  //         title: item.trackName,
  //         category:category,
  //       };
  //     });
  //     this.setState({ searchList: data });
  //     this.props.setKeyword(data)
  //   })
  //   .catch(e =>
  //      this.clearList()
  //   );
  // }
  // search = (isEmpty) => {
  //   // let len = this.state.searchList.length
  //   // if ((this.state.total === len && len > 0) || this.state.isLoading) {
  //   //   return
  //   // }
  //   this.setState({
  //     isLoading: true
  //   }, () => {
  //     this.props.setKeyword(data)
  //   })
  // }
  clearList = () => {
    this.setState({keyword:''})
    this.props.setKeyword('')
  }
  handleChange = (value) => {
      if (value) {
        this.setState({
          keyword: value,
          isLoading: false,
          total: 0,
          appList: []
        }, () =>  this.props.setKeyword(value))
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
            <SearchBar className="my-search" placeholder="Search" value={this.state.keyword} onChange={this.handleChange} onSubmit={this.handleChange} onCancel={this.clearList} onClear={this.clearList}/>
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    keyword: state.keyword
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setKeyword: val => {
      dispatch(createAction(actionTypes.SET_KEYWORD, val))
    }
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Header);
