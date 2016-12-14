import React from 'react';

export default class ErrorStateDoc extends React.Component {
  render() {
    return <div>
      <h3>Usage</h3>
      <p>Pass response object formatted by <code>BaseService</code> and it will render the error message with an appropriate icon.</p>
    </div>;
  }
}