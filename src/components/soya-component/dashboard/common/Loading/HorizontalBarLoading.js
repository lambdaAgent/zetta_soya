import React, { PropTypes } from 'react';
import ClassNames from 'classnames';

import style from './HorizontalBarLoading.mod.css';

/**
 * Usage
 * ---------------------------------
 * <HorizontalBarLoading />
 */
class HorizontalBarLoading extends React.Component {
  static get propTypes() {
    return {
      color: PropTypes.string,
      size: PropTypes.string
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
    let color = this.props.color ? { backgroundColor: this.props.color } : null;

    return (
      <div className={ClassNames(style.spinner, style[this.props.size])} style={this.props.style}>&nbsp;
        <div className={style.bounce1} style={color}></div>
        <div className={style.bounce2} style={color}></div>
        <div className={style.bounce3} style={color}></div>
      </div>
    );
  }
}

export default HorizontalBarLoading;
