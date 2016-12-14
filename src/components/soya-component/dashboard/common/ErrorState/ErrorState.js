import React from 'react';

import BaseService from '../../../base/services/BaseService.js';

import style from './error.mod.css';
import badGateway from './bad-gateway.png';
import bug from './bug.png';
import unauthorized from './unauthorized.png';

const map = {
  [BaseService.STATES.UNAUTHORIZED]: unauthorized,
  [BaseService.STATES.SERVER_ERROR]: bug,
  [BaseService.STATES.NOT_FOUND]: badGateway,
  [BaseService.STATES.UNPARSEABLE]: bug,
  [BaseService.STATES.UNKNOWN_ERROR]: bug
};

export default class ErrorState extends React.Component {
  render() {
    return <div className={style.container}>
      <img src={map[this.props.response.state]} className={style.icon} />
      <p className={style.text}>{this.props.response.errorMessage}</p>
    </div>;
  }
}