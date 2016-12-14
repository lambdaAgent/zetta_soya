import React from 'react';
import { PageNotification } from './PageNotification';

class ComponentDoc extends React.Component {
  render() {
    return (
      <div>
        <h3>Mode</h3>
        <ul>
          {Object.keys(PageNotification.mode).map((o, i) => <li key={i}>{o} : <code>PageNotification.mode.{o}</code></li>)}
        </ul>
        <h3>Action</h3>
        <ul>
          <li>showSuccess(msg)</li>
          <li>showError(msg)</li>
          <li>showInfo(msg)</li>
          <li>showWarning(msg)</li>
          <li>showLoading(msg)</li>
        </ul>
      </div>
    );
  }
}

export default ComponentDoc;
