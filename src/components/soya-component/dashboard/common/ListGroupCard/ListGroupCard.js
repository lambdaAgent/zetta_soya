import React from 'react';
import style from './ListGroupCard.css';

class ListGroupCard extends React.Component {

  static get propTypes() {
    return {
      items: React.PropTypes.array,
      handleClick: React.PropTypes.func,
      height: React.PropTypes.number
    };
  }

  static get defaultProps() {
    return {
      items: [],
      handleClick: (id) => console.log(id)
    };
  }

  render() {
    let customStyle = null;
    if (this.props.height) {
      customStyle = { height: this.props.height + 'px'}
    }
    return (
      <div className={style['list-group']} style={customStyle}>
        {
          this.props.items.map((item, id) => {
            return <button key={id} className={style['list-group-item'] + ' ' + style['list-group-item-action']} onClick={() => this.props.handleClick(item)}>{item}</button>
          })
        }
        { this.props.children }
      </div>
    );
  }
}

export { default as ListGroupItem } from './ListGroupItem';
export default ListGroupCard;
