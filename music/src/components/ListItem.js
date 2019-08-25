import React from 'react';

class ListItem extends React.Component {
  render() {
    return (
      <div className="item">
        <span className="sort">1</span>
        <img src="{this.props.list.img}" alt="app" />
        <div className="recommend">
          <span className="name">{this.props.list.name}</span>
          <span className="info">{this.props.list.info}</span>
          <span className="rate"></span>
        </div>
      </div>
    );
  }
}
export default ListItem;
