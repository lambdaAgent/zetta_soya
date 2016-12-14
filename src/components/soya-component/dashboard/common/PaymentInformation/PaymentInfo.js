import React from 'react';
import connect from 'soya/lib/data/redux/connect';
import PaymentInfoSegment from '../../segments/PaymentInfoSegment.js';
import PaymentConfirmation from './PaymentConfirmation.js';

export default class PaymentInfo extends React.Component {
  static getSegmentDependencies() {
    return [PaymentInfoSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(PaymentInfoSegment.id(), props.bookingId, 'info');
  }

  render() {
    if (this.props.result == null || this.props.result.info == null) {
      return <div>
        Loading, please wait..
      </div>;
    }
    else {
      return <PaymentConfirmation data={this.props.result.info} />;
    }
  }
}

export default connect(PaymentInfo);