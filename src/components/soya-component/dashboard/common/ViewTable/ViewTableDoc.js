import React from 'react';

export default class ViewTableDoc extends React.Component {
  render() {
    return <div>
      <h3>Usage</h3>
      <p>
        The code for this sample uses only the view component. If you
        implemented an API contract for booking center, you can directly use
        <code>ViewTableContext</code> with only providing namespace and
        the url of the API. Like so:
      </p>
      <pre>
        &lt;ViewTableContext namespace="bc" initialSearchSpec= url="https://connectivity.main.tvlk.cloud/api/booking-center" /&gt;
      </pre>
      <p>
        On rendering <code>ViewTableContext</code> component, you provide
        the component with an initial search spec, that is inserted immediately
        into <code>ViewTableSegment</code> for querying.
      </p>
    </div>;
  }
}