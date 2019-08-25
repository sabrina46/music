import React from 'react';
import ListItem from '../../components/ListItem.js'
class AppList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appList: [{ img: '', name: '香港即时新闻', info: '新闻' }, { img: '', name: 'Feyues-3D相片', info: '照片和视讯' }]
    };
  }
  render() {
    let { appList } = this.state;
    return (
      <div className="content">
        {appList.map(item => {
          return (
            <ListItem list="{item}"></ListItem>
          );
        })}
      </div>
    );
  }
}
export default AppList;
