import React from 'react';
import './recommend.module.scss';
class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendList: [{ img: '', name: 'Feyues-3D相片', info: '照片和视讯' }, { img: '', name: 'Feyues-3D相片', info: '照片和视讯' }]
    };
  }
  render() {
    let { recommendList } = this.state;
    return (
      <div className="content">
        <h1 className="title">推介</h1>
        <div className="list">
          {recommendList.map(item => {
            return (
              <div className="item">
                <img src="item.img" alt="app" className="img" />
                <div className="name">{item.name}</div>
                <div className="info">{item.info}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Recommend;
