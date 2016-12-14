import React from 'react';
import Authorize from './Authorize.js';

export default class AuthorizeThumbnail extends React.Component {
  render() {
    return <div style={{position: 'relative'}}>
      <Authorize context={this.props.context}>
        <h3>Hidden Components</h3>
      </Authorize>
    </div>;
  }
}