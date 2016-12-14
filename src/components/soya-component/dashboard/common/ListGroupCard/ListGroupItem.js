import React from 'react';
import style from './ListGroupCard.css';

class ListGroupItem extends React.Component {

  static get propTypes() {
    return {
      onClick: React.PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
    };
  }

  render() {
    if (this.props.onClick) {
      return (
        <div onClick={this.props.onClick.bind(this)} className={style['list-group-item'] + ' ' + style['list-group-item-action']}>{this.props.children}</div>
      )
    }
    return (
      <div className={style['list-group-item']}>{this.props.children}</div>
    );
  }
}

export default ListGroupItem;
