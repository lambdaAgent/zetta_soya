import React from 'react';
import style from './Grid.mod.scss';

/**
 * Column
 *
 * @property {number} size
 *
 * Usage
 * ---------------------------------
 * <Column size={4}>
 *   Content
 * </Column>
 */

class Column extends React.Component {

  static get propTypes() {
    return {
      size: React.PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      size: 12
    };
  }

  render() {
    return (
      <div className={style['col-' + this.props.size]}>
        {this.props.children}
      </div>
    );
  }
}

export default Column;