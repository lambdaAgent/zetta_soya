import React from 'react';
import ClassNames from 'classnames';
import style from './Boolean.css';

class Boolean extends React.Component {
  render() {
    return (
      <div className={ClassNames({
        [style.round]: true,
        [style.true]: this.props.true,
        [style.false]: this.props.false,
      })} />
    )
  }
}

export default Boolean;