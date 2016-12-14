import React from 'react';
import ClassNames from 'classnames';
import style from './LayoutAntiMargin.css';

class AntiMargin extends React.Component {

  static get propTypes() {
    return {};
  }

  static get defaultProps() {
    return {};
  }

  render() {
    return (
      <div className={ClassNames(style.antiMargin, {[style.modal]: this.props.modal})}>
        {this.props.children}
      </div>
    );
  }
}

export default AntiMargin;
