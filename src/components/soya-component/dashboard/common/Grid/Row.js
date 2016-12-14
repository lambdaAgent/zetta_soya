import React from 'react';
import style from './Grid.mod.scss';

/**
 * Row
 *
 * Usage
 * ---------------------------------
 * <Row>
 *   Content
 * </Row>
 */

class Row extends React.Component {
  render() {
    return (
      <div className={style.row}>
        {this.props.children}
      </div>
    );
  }
}

export default Row;