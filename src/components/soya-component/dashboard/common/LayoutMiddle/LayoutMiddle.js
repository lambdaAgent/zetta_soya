import React from 'react';

import style from './LayoutMiddle.css';

class Middle extends React.Component {

  static get propTypes() {
    return {
      size: React.PropTypes.number,
    };
  }

  static get defaultProps() {
    return {
      size: 4
    };
  }

  render() {
    return (
    <div className={style.centerWrapper}>
      <div className={style['col-lg-' + this.props.size] + ' ' + style.center}>
        {this.props.children}
      </div>
    </div>
    );
  }
}

export default Middle;