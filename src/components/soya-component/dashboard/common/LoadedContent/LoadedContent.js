import React from 'react';

import BaseService from '../../../base/services/BaseService.js';
import BallClipRotate from '../Loading/BallClipRotate.js';
import ErrorState from '../ErrorState/ErrorState.js';

export default class LoadedContent extends React.Component {
  static check(response) {
    return response != null && response.data != null;
  }

  render() {
    if (this.props.response == null) {
      return <div style={{textAlign: 'center'}}>
        <BallClipRotate color="green" />
      </div>;
    }

    if (this.props.response.state == BaseService.STATES.OK) {
      return <div>
        {this.props.children}
      </div>;
    }

    return <ErrorState response={this.props.response} />;
  }
}