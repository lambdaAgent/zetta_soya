import React from 'react';
import style from './SimpleCard.mod.css';

export default class SimpleCard extends React.Component {
  render () {
    return (
      <div className={style.panel}>
        <div className={style['panel-body']}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
