import React from 'react';
import ClassNames from 'classnames';

import style from './PopDown.css';

class PopDown extends React.Component {
  static get propTypes() {
    return {

    };
  }

  static get defaultProps() {
    return {

    };
  }

  render() {
    return (
      <div className={style.popDownWrapper}>
        <div className={style.content + ' ' + style.arrow_box}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export { default as Toggler } from './Toggler'
export default PopDown;