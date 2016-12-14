import React, { PropTypes } from 'react';
import ClassNames from 'classnames';
import style from './HighlightLabel.mod.css';

class HighlightLabel extends React.Component {
  static get propTypes() {
    return {
      text: PropTypes.string.isRequired,
      labelStyle: PropTypes.string
    };
  }

  static get STYLE() {
    return {
      DEFAULT: 'hl.style.default',
      BLUE: style.labelBlue,
      YELLOW: style.labelYellow,
      GREEN: style.labelGreen,
      RED: style.labelRed
    };
  }

  render() {
    return <span className={ClassNames(style.label, this.props.labelStyle)}>{this.props.text}</span>;
  }
}

export default HighlightLabel;