import React from 'react';
import recommend from './recommend.module.scss';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import classnames from 'classnames';
class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendList: [
        {
          img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
          title: 'Meet hotel',
          desc: '不是所有的兼职汪都需要风吹日晒'
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
          title: "McDonald's invites you",
          desc: '不是所有的兼职汪都需要风吹日晒'
        },
        {
          img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
          title: 'Eat the week',
          desc: '不是所有的兼职汪都需要风吹日晒'
        }
      ]
    };
  }
  componentDidMount() {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 20
    });
    this.getList();
  }
  getList() {
    fetch('../data/recomendData.json')
      .then(res => res.json())
      .then(res => {
        this.setState = { recommendList: res.entry };
      })
      .catch(e => console.log('错误:', e));
  }
  render() {
    let { recommendList } = this.state;
    return (
      <div className={recommend.content}>
        <h1 className={recommend.title}>推介</h1>
        <div className={classnames([recommend.container, 'swiper-container'])}>
          <div className={classnames([recommend.list, 'swiper-wrapper'])}>
            {recommendList.map((item, i) => {
              return (
                <div className={classnames([recommend.item, 'swiper-slide'])} key={i}>
                  <img src={item.img} alt="app" className={recommend.img} />
                  <span className={recommend.name}>{item.title}</span>
                  <span className={recommend.info}>{item.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Recommend;
