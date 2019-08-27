import React from 'react';
import recommend from './recommend.module.scss';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

class Recommend extends React.Component {
  static propTypes = {
    keyword: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      recommendList: [
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
  searchList() {
    fetch('../data/lookUp.json', {
      method: 'get',
      dataType: 'json',
      //  body: JSON.stringify({ keyword: this.props.keyword })
    })
      .then(res => res.json())
      .then(res => {
        let data = res.results.map((item, i) => {
          let category = item.genres.length > 1 ? item.genres.splice(0, 2).join('和') : item.genres[0];
          return {
            img: item.screenshotUrls[0],
            title: item.trackName,
            category: category,
            sort: i + 1
          };
        });
        this.setState({
          recommendList: data
        });
      })
      .catch(e => console.log('错误：', e));
  }
  getList() {
    fetch('../data/recomendData.json',{
      method: 'get',
      dataType: 'json',
    }).then(res => res.json())
      .then(res => {
        let data = res.feed.entry.map((item, i) => {
          return {
            img: item['im:image'][0]['label'],
            title: item.title.label,
            category: item.category.attributes.label,
            rate: i
          };
        });
        this.setState({ recommendList: data }, () => {
          new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 20,
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true //修改swiper的父元素时，自动初始化swiper
          });
        });
      })
      .catch(e => console.log('错误:', e));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.keyword !== nextProps.keyword) {
      //在这里我们仍可以通过this.props来获取旧的外部状态
      if (nextProps.keyword) {
         this.setState({ recommendList: []}, this.searchList());
      }else{
        this.setState({ recommendList: [] },  this.getList());
      }
    }
  }
  render() {
    let recommendList =  this.state.recommendList;
    return (
      <div className={recommend.content}>
        <Link to="/detail">
          <h1 className={recommend.title}>推介</h1>
          <div className={classnames([recommend.container, 'swiper-container',{'hidden': !recommendList.length}])}>
            <div className={classnames([recommend.list, 'swiper-wrapper'])}>
              {recommendList.map((item, i) => {
                return (
                  <div className={classnames([recommend.item, 'swiper-slide'])} key={i}>
                    <img src={item.img} alt="app" className={recommend.img} />
                    <span className={recommend.name}>{item.title}</span>
                    <span className={recommend.info}>{item.category}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={classnames([recommend.empty,{'hidden': recommendList.length }])}>暂无数据</div>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    keyword: state.keyword
  };
};

export default connect(mapStateToProps)(Recommend);
