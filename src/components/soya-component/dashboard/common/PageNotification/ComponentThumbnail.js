import React from 'react';

import PageNotificationContainer, { PageNotificationAction } from './PageNotification';

class ComponentThumbnail extends React.Component {
  componentWillMount() {
    this.notification = new PageNotificationAction(this.props.context.reduxStore);
  }

  render() {
    return (
      <div>
        { /* Put this container on the page component */ }
        <PageNotificationContainer context={this.props.context} />

        <a href='javascript:;' onClick={() => { this.notification.showSuccess('Success Message') }}>Show success</a>&nbsp;
        <a href='javascript:;' onClick={() => { this.notification.showError('Error Message') }}>Show error</a>
      </div>
    );
  }
}

export default ComponentThumbnail;
