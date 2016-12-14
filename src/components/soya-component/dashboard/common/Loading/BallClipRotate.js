import React, { PropTypes } from 'react';
import ClassNames from 'classnames';

import style from './BallClipRotate.mod.css';

/**
 * Usage
 * ---------------------------------
 * <BallClipRotate />
 */
class BallClipRotate extends React.Component {
  static get propTypes() {
    return {
      color: PropTypes.string,
      size: PropTypes.string,
      style: PropTypes.string
    };
  }

  static get SIZE() {
    return {
      DEFAULT: 'default',
      LARGE: 'large',
      XLARGE: 'xlarge'
    };
  }

  render() {
    let color = this.props.color ? { borderColor: this.props.color, borderBottomColor: 'transparent' } : null;
    
    return (
      <div className={ClassNames(style.ballClipRotate, style[this.props.size])} style={this.props.style}>
        &nbsp;<div style={color}></div>
      </div>
    );
  }
}

export default BallClipRotate;
