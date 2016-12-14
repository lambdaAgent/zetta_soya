import React from 'react';
import style from './Select.css';

class Select extends React.Component {
  render() {
    return <select {...this.props} className={style.select} />
  }
}

export default Select;