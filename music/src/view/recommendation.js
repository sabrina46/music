import React from 'react';
import ListItem from '../../components/ListItem.js'
import styles from './recommendation.module.scss';
class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: [{ img: '', title: '香港即时新闻', desc: '新闻' },
      { img: '', title: 'Feyues-3D相片', desc: '照片和视讯' },
      { img: '', title: 'Feyues-3D相片', desc: '照片和视讯' },
      { img: '', title: 'Feyues-3D相片', desc: '照片和视讯' }
    ]
    };
  }
  render() {
    let { appList } = this.state;
    return (
      <div className={styles.content}>
        {appList.map((item,i) => {
          return (
            <ListItem list={item} key={i}></ListItem>
          );
        })}
      </div>
    );
  }
}
export default Recommendation;
